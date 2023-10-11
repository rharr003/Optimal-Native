import { StyleSheet, Text, View } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  setWorkout,
  incrementTimer,
  addInterval,
  stopWorkout,
} from "../../../../../../util/redux/slices/workout";
import * as Haptics from "expo-haptics";
import ModalButtons from "./ModalButtons";
import ExerciseList from "./ExerciseList";

export default function StartWorkoutMain({ workout, handleClose }) {
  const isActive = useSelector((state) => state.workout.isActive);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const exercisesToShow = workout.exercises.slice(0, 6);

  function handleStartWorkout() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(stopWorkout());
    dispatch(setWorkout(workout));

    const interval = setInterval(() => {
      dispatch(incrementTimer({ amount: 1 }));
    }, 1000);

    dispatch(addInterval(interval));

    handleClose();

    navigation.navigate("active", { interval: interval });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>

      <ExerciseList exercises={exercisesToShow} />
      {isActive && (
        <Text style={styles.warning}>
          Starting workout will overide current workout
        </Text>
      )}
      <ModalButtons
        handleStart={handleStartWorkout}
        handleClose={handleClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },

  warning: {
    color: ColorPalette.dark.error,
  },
});
