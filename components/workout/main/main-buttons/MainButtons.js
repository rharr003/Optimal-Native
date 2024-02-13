import {
  startWorkout,
  incrementTimer,
  addInterval,
} from "../../../../util/redux/slices/workout";
import CustomButton from "../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";
import { StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

export default function MainButtons({
  interval,
  workoutIsActive,
  navigation,
  dispatch,
}) {
  function handleStartWorkout() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(startWorkout());

    interval.current = setInterval(() => {
      dispatch(incrementTimer({ amount: 1 }));
    }, 1000);
    dispatch(addInterval(interval.current));

    navigation.navigate("active", { interval: interval });
  }

  function handleContinueWorkout() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("active", { interval: interval });
  }

  function viewHistory() {
    navigation.navigate("past");
  }

  return (
    <>
      {!workoutIsActive && (
        <CustomButton
          onPress={workoutIsActive ? handleContinueWorkout : handleStartWorkout}
          title={workoutIsActive ? "Continue Workout" : "Start Empty Workout"}
          iconName={workoutIsActive ? "enter-outline" : "flash-outline"}
          color={ColorPalette.dark.secondary200}
          showTimer={true}
          style={styles.buttonStyle}
        />
      )}
      <CustomButton
        title="View Past Workouts"
        iconName="calendar-outline"
        color={ColorPalette.dark.gray700}
        textColor="#FFFFFF"
        onPress={viewHistory}
        style={styles.buttonStyle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    paddingVertical: 10,
    marginVertical: 5,
  },
});
