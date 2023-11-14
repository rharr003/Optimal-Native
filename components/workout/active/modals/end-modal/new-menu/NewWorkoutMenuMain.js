import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../../../../util/redux/slices/workout";
import { stopRestTimer } from "../../../../../../util/redux/slices/restTimer";
import {
  insertWorkout,
  insertWorkoutExercise,
  insertTemplate,
  fetchTemplateExercises,
} from "../../../../../../util/sqlite/db";
import { addTemplate } from "../../../../../../util/redux/slices/templates";
import { updateAfterWorkout } from "../../../../../../util/redux/slices/widgets";
import { calculateWorkoutVolume } from "../../../../../../util/calculateWorkoutVolume";
import NewWorkoutMenuButtons from "./NewWorkoutMenuButtons";

export default function NewWorkoutMain({ workout }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function saveWorkout() {
    dispatch(stopRestTimer());
    dispatch(stopWorkout());
    const volume = calculateWorkoutVolume(workout);
    dispatch(
      updateAfterWorkout({ duration: workout.duration, volume: volume })
    );
    const workoutId = await insertWorkout(
      workout.name,
      workout.duration,
      new Date().toISOString().split("T")[0]
    );
    const promiseArray = [];
    workout.exercisesNew.forEach((exercise) => {
      workout.exerciseSets[exercise.reactId].forEach((set) => {
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
    const workoutId = await saveWorkout();
    const templateId = await insertTemplate(workout.name, workoutId);
    // add template to store so we dont have to keep rerunning template fetch from db
    const templateForRedux = await fetchTemplateExercises(
      workout.name,
      workoutId,
      new Date().toISOString().split("T")[0],
      templateId
    );

    dispatch(addTemplate(templateForRedux));
    navigation.goBack();
  }

  async function finishWorkout() {
    try {
      await saveWorkout();
    } catch (e) {
      console.log(e);
    }
    navigation.goBack();
  }

  return (
    <NewWorkoutMenuButtons
      finishAsTemplate={finishWorkoutAsTemplate}
      finish={finishWorkout}
    />
  );
}
