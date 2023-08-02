import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ColorPalette } from "../../ui/ColorPalette";
import CustomButton from "../../ui/CustomButton";
import { startWorkout } from "../../../util/workout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import WorkoutHomeActiveWorkoutLabel from "./WorkoutHomeActiveWorkoutLabel";
import { useIsFocused } from "@react-navigation/native";
export default function WorkoutHome() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const workoutIsActive = useSelector((state) => state.workout.isActive);
  const isFocused = useIsFocused();

  const handleStartWorkout = () => {
    dispatch(startWorkout());
    navigation.navigate("active");
  };

  function handleContinueWorkout() {
    navigation.navigate("active");
  }

  return (
    <View style={styles.container}>
      {workoutIsActive && isFocused ? <WorkoutHomeActiveWorkoutLabel /> : null}
      <CustomButton
        onPress={workoutIsActive ? handleContinueWorkout : handleStartWorkout}
        title={workoutIsActive ? "Continue Workout" : "Start Workout"}
        iconName={workoutIsActive ? "enter-outline" : "flash-outline"}
        color={ColorPalette.dark.secondary200}
        showTimer={true}
        style={{ width: "100%" }}
      />
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
