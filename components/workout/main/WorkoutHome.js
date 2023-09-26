import { View, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import CustomButton from "../../shared/ui/CustomButton";
import {
  startWorkout,
  incrementTimer,
  addInterval,
} from "../../../util/redux/workout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import WorkoutHomeActiveWorkoutLabel from "./WorkoutHomeActiveWorkoutLabel";
import { useIsFocused } from "@react-navigation/native";
import TemplateContainer from "./TemplateContainer";
import { useRef, useEffect } from "react";
export default function WorkoutHome({ navigation }) {
  const dispatch = useDispatch();
  const workoutIsActive = useSelector((state) => state.workout.isActive);
  const isFocused = useIsFocused();
  const interval = useRef(null);

  useEffect(() => {
    if (workoutIsActive && !interval.current) {
      console.log("workout home setting interval");

      interval.current = setInterval(() => {
        dispatch(incrementTimer({ amount: 1 }));
      }, 1000);

      dispatch(addInterval(interval.current));
    }
  }, [workoutIsActive]);

  const handleStartWorkout = () => {
    dispatch(startWorkout());

    interval.current = setInterval(() => {
      dispatch(incrementTimer({ amount: 1 }));
    }, 1000);
    dispatch(addInterval(interval.current));

    navigation.navigate("active", { interval: interval });
  };

  function handleContinueWorkout() {
    navigation.navigate("active", { interval: interval });
  }

  return (
    <View style={styles.container}>
      {workoutIsActive && isFocused ? (
        <WorkoutHomeActiveWorkoutLabel position={"home"} />
      ) : null}
      <CustomButton
        onPress={workoutIsActive ? handleContinueWorkout : handleStartWorkout}
        title={workoutIsActive ? "Continue Workout" : "Start Empty Workout"}
        iconName={workoutIsActive ? "enter-outline" : "flash-outline"}
        color={ColorPalette.dark.secondary200}
        showTimer={true}
        style={{ width: "100%" }}
      />
      <CustomButton
        title="View Past Workouts"
        iconName="calendar-outline"
        color={ColorPalette.dark.gray500}
        textColor="#FFFFFF"
        onPress={() => navigation.navigate("past")}
        style={{ width: "100%" }}
      />
      <TemplateContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
});
