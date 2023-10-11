import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../../../util/formatTime";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import persistRestTimer from "../../../../util/app-state/persistRestTimer";
import CustomButton from "../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, StyleSheet, Text, AppState } from "react-native";
import {
  decrementRestTimer,
  incrementRestTimer,
  updateAndMinimizeRestTimer,
  setRestTimer,
} from "../../../../util/redux/slices/restTimer";
import { scheduleRestTimerNotification } from "../../../../util/app-state/restTimerNotification";

export default function RestTimerCombined({
  finishRestTimer,
  size,
  isMinimized,
  strokeWidth = 12,
  trailStrokeWidth = 12,
}) {
  const appState = AppState.currentState;
  const initialRestTime = useSelector(
    (state) => state.restTimer.initialRestTime
  );
  const restTimer = useSelector((state) => state.restTimer.restTimer);
  const [key, setKey] = useState(0);
  const currentRestTimeRef = useRef(restTimer);
  const [hasReset, setHasReset] = useState(false);
  const dispatch = useDispatch();

  function handleAppStateChange(nextAppState) {
    // if app is active and goes to background, schedule notification and update store
    if (appState.match("active") && nextAppState === "background") {
      scheduleRestTimerNotification(currentRestTimeRef.current);
      // I dont think I need to do this as the restTimer is up to date in redux now
      // dispatch(
      //   decrementRestTimer({
      //     amount: initialRestTime - currentRestTimeRef.current,
      //   })
      // );
      persistRestTimer(initialRestTime, currentRestTimeRef.current);
    }
  }
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    // resets the countdown timer when component mounts to avoid stale state showing the wrong remaining time when navigating back to the workout screen
    setKey(Math.random());
    setHasReset(true);
    // cancels all notifications when component mounts
    Notifications.cancelAllScheduledNotificationsAsync();
    currentRestTimeRef.current = restTimer;
    // only updates store when component unmounts as the shared state is not neeeded until then.
    return () => {
      if (restTimer <= 0) return;
      console.log(
        `setting notification for ${currentRestTimeRef.current} seconds in the future`
      );
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Rest Timer",
          body: "Get back to work!",
        },
        trigger: {
          seconds: currentRestTimeRef.current,
        },
      });
      dispatch(
        updateAndMinimizeRestTimer({ restTime: currentRestTimeRef.current })
      );
    };
  }, []);

  function updateCurrentTime(time) {
    //this runs once per second if passed into the countdown circle timer
    dispatch(decrementRestTimer({ amount: 1 }));
    currentRestTimeRef.current = time;
  }

  function decreaseCurrentTimeBy15() {
    dispatch(decrementRestTimer({ amount: 15 }));
    // change the key for the countdown circle timer so that it update the remaining time
    // when we change the remaining time in the store
    setKey(Math.random());
  }

  function increaseCurrentTimeBy15() {
    dispatch(incrementRestTimer({ amount: 15 }));
    // change the key for the countdown circle timer so that it update the remaining time
    // when we change the remaining time in the store
    setKey(Math.random());
  }
  return (
    <View style={isMinimized ? styles.containerMinimized : styles.container}>
      <CountdownCircleTimer
        isPlaying
        size={size}
        onComplete={finishRestTimer}
        onUpdate={updateCurrentTime}
        duration={initialRestTime}
        initialRemainingTime={restTimer}
        colors={ColorPalette.dark.secondary200}
        trailColor={ColorPalette.dark.gray900}
        strokeWidth={strokeWidth}
        trailStrokeWidth={trailStrokeWidth}
        key={key}
      >
        {!isMinimized &&
          (({ remainingTime, animatedColor }) => (
            <Text style={{ color: "#FFFFFF", fontSize: 40 }}>
              {formatTime(remainingTime)}
            </Text>
          ))}
      </CountdownCircleTimer>
      {isMinimized && (
        <Text style={{ color: "#FFFFFF", fontSize: 20, marginLeft: 10 }}>
          {formatTime(restTimer)}
        </Text>
      )}

      {!isMinimized && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Skip"
            color={ColorPalette.dark.error}
            onPress={finishRestTimer}
            iconName="barbell-outline"
            style={{ width: "25%" }}
          />
          <CustomButton
            title="15 sec"
            color={ColorPalette.dark.secondary200}
            onPress={increaseCurrentTimeBy15}
            iconName="add-circle-outline"
            style={{ width: "25%" }}
          />
          <CustomButton
            title="15 sec"
            color={ColorPalette.dark.secondary200}
            onPress={decreaseCurrentTimeBy15}
            iconName="remove-circle-outline"
            style={{ width: "25%" }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 20,
  },

  containerMinimized: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
