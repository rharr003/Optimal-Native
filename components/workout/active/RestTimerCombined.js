import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../../util/formatTime";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import persistRestTimer from "../../../util/persistRestTimer";
import CustomButton from "../../ui/CustomButton";
import { ColorPalette } from "../../ui/ColorPalette";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, StyleSheet, Text, AppState } from "react-native";
import {
  decrementRestTimer,
  incrementRestTimer,
  updateAndMinimizeRestTimer,
} from "../../../util/restTimer";

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
  const currentRestTime = useSelector((state) => state.restTimer.restTimer);
  const [key, setKey] = useState(0);
  const restTimerActive = useSelector(
    (state) => state.restTimer.restTimerActive
  );
  const currentRestTimeRef = useRef(currentRestTime);
  const [hasReset, setHasReset] = useState(false);
  const dispatch = useDispatch();

  function handleAppStateChange(nextAppState) {
    // if app is active and goes to background, schedule notification and update store
    if (appState.match("active") && nextAppState === "background") {
      Notifications.cancelAllScheduledNotificationsAsync();
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
        decrementRestTimer({
          amount: initialRestTime - currentRestTimeRef.current,
        })
      );
      persistRestTimer(initialRestTime, currentRestTimeRef.current);
    }
  }
  console.log("rest time according to ref", currentRestTimeRef.current);
  console.log("rest time according to store", currentRestTime);
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
    setKey((prevKey) => prevKey + 1);
    // cancels all notifications when component mounts
    Notifications.cancelAllScheduledNotificationsAsync();
    currentRestTimeRef.current = currentRestTime;
    // only updates store when component unmounts as the shared state is not neeeded until then.
    return () => {
      if (currentRestTimeRef.current === 0) return;
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
    currentRestTimeRef.current = time;
  }
  return (
    <View style={isMinimized ? styles.containerMinimized : styles.container}>
      <CountdownCircleTimer
        isPlaying
        size={size}
        onComplete={finishRestTimer}
        onUpdate={updateCurrentTime}
        duration={initialRestTime}
        initialRemainingTime={currentRestTime}
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
          {formatTime(currentRestTimeRef.current)}
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
            onPress={() => dispatch(incrementRestTimer({ amount: 15 }))}
            iconName="add-circle-outline"
            style={{ width: "25%" }}
          />
          <CustomButton
            title="15 sec"
            color={ColorPalette.dark.secondary200}
            onPress={() => dispatch(decrementRestTimer({ amount: 15 }))}
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
