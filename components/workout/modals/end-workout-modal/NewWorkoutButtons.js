import CustomButton from "../../../ui/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../../util/redux/workout";
import { stopRestTimer } from "../../../../util/redux/restTimer";
import { ColorPalette } from "../../../ui/ColorPalette";
import {
  insertWorkout,
  insertWorkoutExercise,
  insertTemplate,
} from "../../../../util/sqlite/db";

export default function NewWorkoutButtons({ workout }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function handleFinishWorkout(asTemplate = false) {
    dispatch(stopWorkout());
    dispatch(stopRestTimer());
    const workoutId = await insertWorkout(
      workout.name,
      workout.duration,
      new Date().toISOString()
    );
    if (asTemplate) {
      await insertTemplate(workout.name, workoutId);
    }
    const promiseArray = [];
    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        if (set.completed && set.weight && set.reps) {
          promiseArray.push(
            insertWorkoutExercise(
              workoutId,
              exercise.id,
              set.weight,
              set.reps,
              set.unit
            )
          );
        }
      });
    });
    await Promise.all(promiseArray);

    navigation.goBack();
  }
  return (
    <>
      <CustomButton
        title="Finish and save as template"
        onPress={() => handleFinishWorkout(true)}
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
        onPress={handleFinishWorkout}
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
