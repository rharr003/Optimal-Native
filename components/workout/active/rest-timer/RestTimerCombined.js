import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../../../util/formatTime";
import * as Notifications from "expo-notifications";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import persistRestTimer from "../../../../util/app-state/persistRestTimer";
import { ColorPalette } from "../../../../ColorPalette";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, StyleSheet, Text, AppState } from "react-native";
import {
  decrementRestTimer,
  incrementRestTimer,
  updateAndMinimizeRestTimer,
  decrementRestTimerBy15,
} from "../../../../util/redux/slices/restTimer";
import { scheduleRestTimerNotification } from "../../../../util/app-state/restTimerNotification";
import RestTimerCenter from "./RestTimerCenter";
import RestTimerButtons from "./RestTimerButtons";

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
  const [renderCount, setRenderCount] = useState(0);
  const currentRestTimeRef = useRef(restTimer);
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
      dispatch(
        updateAndMinimizeRestTimer({ restTime: currentRestTimeRef.current })
      );
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
    console.log("restTime being loaded by component", restTimer);
    // resets the countdown timer when component mounts to avoid stale state showing the wrong remaining time when navigating back to the workout screen
    setKey(Math.random());
    // cancels all notifications when component mounts
    Notifications.cancelAllScheduledNotificationsAsync();
    currentRestTimeRef.current = restTimer;
    // only updates store when component unmounts as the shared state is not neeeded until then.
    return () => {
      if (currentRestTimeRef.current <= 0) return;
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
    dispatch(decrementRestTimer());
    currentRestTimeRef.current = time;
  }

  function decreaseCurrentTimeBy15() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(decrementRestTimerBy15());
    // change the key for the countdown circle timer so that it update the remaining time
    // when we change the remaining time in the store
    setKey(Math.random());
  }

  function increaseCurrentTimeBy15() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(incrementRestTimer({ amount: 15 }));
    // change the key for the countdown circle timer so that it update the remaining time
    // when we change the remaining time in the store
    setKey(Math.random());
  }

  return (
    <View style={isMinimized ? styles.containerMinimized : styles.container}>
      {!isMinimized && (
        <View>
          <Text style={styles.italic}>Tap outside to minimize</Text>
        </View>
      )}
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
          (({ remainingTime }) => (
            <RestTimerCenter
              time={remainingTime}
              increase={increaseCurrentTimeBy15}
              decrease={decreaseCurrentTimeBy15}
            />
          ))}
      </CountdownCircleTimer>
      {isMinimized && (
        <Text style={{ color: "#FFFFFF", fontSize: 20, marginLeft: 10 }}>
          {formatTime(restTimer)}
        </Text>
      )}

      {!isMinimized && (
        <RestTimerButtons
          skip={finishRestTimer}
          increase={increaseCurrentTimeBy15}
          decrease={decreaseCurrentTimeBy15}
        />
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

  button: {
    width: "80%",
    paddingVertical: 2,
    marginTop: 10,
    marginBottom: 0,
  },

  title: {
    fontSize: 24,
    color: ColorPalette.dark.secondary200,
    marginBottom: 10,
    textAlign: "center",
  },

  italic: {
    fontSize: 18,
    fontStyle: "italic",
    color: ColorPalette.dark.gray500,
    textAlign: "center",
  },
});
