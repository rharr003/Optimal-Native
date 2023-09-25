import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, StyleSheet, Text, AppState } from "react-native";
import { ColorPalette } from "../ui/ColorPalette";
import { formatTime } from "../../util/formatTime";
import { useState, useEffect } from "react";
import { decrementRestTimer } from "../../util/workout";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import persistRestTimer from "../../util/persistRestTimer";

export default function MinimizedRestTimer({
  remainingTime,
  finishRestTimer,
  initialRestTime,
}) {
  const [currentTime, setCurrentTime] = useState(remainingTime);
  const dispatch = useDispatch();
  const appState = AppState.currentState;

  function handleAppStateChange(nextAppState) {
    if (appState.match("active") && nextAppState === "background") {
      console.log("minimized went off");
      dispatch(decrementRestTimer({ amount: initialRestTime - currentTime }));
      persistRestTimer(initialRestTime, currentTime);
      Notifications.cancelAllScheduledNotificationsAsync();
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Rest Timer",
          body: "Get back to work!",
        },
        trigger: {
          seconds: currentTime,
        },
      });
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

  function updateCurrentTime(time) {
    setCurrentTime(time);
  }

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        size={40}
        onComplete={finishRestTimer}
        onUpdate={updateCurrentTime}
        duration={initialRestTime}
        initialRemainingTime={remainingTime}
        colors={ColorPalette.dark.secondary200}
        trailColor={ColorPalette.dark.gray900}
        strokeWidth={4}
        trailStrokeWidth={6}
      ></CountdownCircleTimer>
      <Text style={{ color: "#FFFFFF", fontSize: 20, marginLeft: 10 }}>
        {formatTime(currentTime)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
