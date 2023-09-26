import CustomButton from "../../../shared/ui/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../../util/redux/workout";
import { stopRestTimer } from "../../../../util/redux/restTimer";
import { ColorPalette } from "../../../../ColorPalette";
import {
  insertWorkout,
  insertWorkoutExercise,
  insertTemplate,
} from "../../../../util/sqlite/db";

export default function NewWorkoutButtons({ workout }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function saveWorkout() {
    const workoutId = await insertWorkout(
      workout.name,
      workout.duration,
      new Date().toISOString().split("T")[0]
    );
    const promiseArray = [];
    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        if (set.completed) {
          promiseArray.push(
            insertWorkoutExercise(
              workoutId,
              exercise.id,
              set.weight === "" ? 0 : set.weight,
              set.reps,
              set.unit
            )
          );
        }
      });
    });
    await Promise.all(promiseArray);

    return workoutId;
  }

  async function finishWorkoutAsTemplate() {
    dispatch(stopWorkout());
    dispatch(stopRestTimer());
    const workoutId = await saveWorkout();
    await insertTemplate(workout.name, workoutId);
    navigation.goBack();
  }

  async function finishWorkout() {
    dispatch(stopWorkout());
    dispatch(stopRestTimer());
    await saveWorkout();
    navigation.goBack();
  }
  return (
    <>
      <CustomButton
        title="Finish and save as template"
        onPress={finishWorkoutAsTemplate}
        iconName={"save-outline"}
        style={{
          marginBottom: 10,
          marginTop: 0,
          paddingVertical: 3,
          width: "90%",
        }}
        color={ColorPalette.dark.primary200}
        textColor="#FFFFFF"
      />
      <CustomButton
        title="Finish workout"
        onPress={finishWorkout}
        iconName={"checkmark-outline"}
        style={{
          marginBottom: 10,
          marginTop: 0,
          paddingVertical: 3,
          width: "90%",
        }}
        color={ColorPalette.dark.secondary200}
        textColor="#FFFFFF"
      />
    </>
  );
}
