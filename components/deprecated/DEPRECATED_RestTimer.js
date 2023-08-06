import { View, Text, StyleSheet, AppState } from "react-native";
import { formatTime } from "../../util/formatTime";
import { useDispatch } from "react-redux";
import { decrementRestTimer, incrementRestTimer } from "../../util/workout";
import CustomButton from "../ui/CustomButton";
import { ColorPalette } from "../ui/ColorPalette";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import persistRestTimer from "../../util/persistRestTimer";

export default function RestTimer({
  finishRestTimer,
  initialRestTime,
  currentRestTime,
}) {
  const appState = AppState.currentState;
  const dispatch = useDispatch();

  function handleAppStateChange(nextAppState) {
    if (appState.match("active") && nextAppState === "background") {
      Notifications.cancelAllScheduledNotificationsAsync();
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Rest Timer",
          body: "Get back to work!",
        },
        trigger: {
          seconds: currentRestTime.current,
        },
      });
      dispatch(
        decrementRestTimer({
          amount: initialRestTime - currentRestTime.current,
        })
      );
      persistRestTimer(initialRestTime, currentRestTime.current);
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
    console.log(time);
    currentRestTime.current = time;
  }
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        size={225}
        onComplete={finishRestTimer}
        onUpdate={updateCurrentTime}
        duration={initialRestTime}
        colors={ColorPalette.dark.secondary200}
        trailColor={ColorPalette.dark.gray900}
      >
        {({ remainingTime, animatedColor }) => (
          <Text style={{ color: "#FFFFFF", fontSize: 40 }}>
            {formatTime(remainingTime)}
          </Text>
        )}
      </CountdownCircleTimer>
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
