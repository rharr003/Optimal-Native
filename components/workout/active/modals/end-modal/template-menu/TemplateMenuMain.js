import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { stopWorkout } from "../../../../../../util/redux/slices/workout";
import { stopRestTimer } from "../../../../../../util/redux/slices/restTimer";
import { updateTemplate as updateTemplateRedux } from "../../../../../../util/redux/slices/templates";
import {
  insertWorkout,
  insertWorkoutExercise,
  updateTemplate,
  fetchTemplateExercises,
} from "../../../../../../util/sqlite/db";
import { useState, useEffect } from "react";
import { updateAfterWorkout } from "../../../../../../util/redux/slices/widgets";
import { calculateWorkoutVolume } from "../../../../../../util/calculateWorkoutVolume";
import { checkWorkoutDidNotChange } from "../../../../../../util/checkWorkoutDidNotChange";
import TemplateMenuButtons from "./TemplateMenuButtons";

export default function TemplateMenuMain({ workout }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const prevWorkout = useSelector((state) => state.workout.prevWorkout);
  const [workoutIsSame, setWorkoutIsSame] = useState(true);

  useEffect(() => {
    setWorkoutIsSame(checkWorkoutDidNotChange(workout, prevWorkout));
  }, [workout]);

  async function handleFinishWorkout(shouldUpdateTemplate = false) {
    try {
      dispatch(stopWorkout());
      dispatch(stopRestTimer());
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

      if (shouldUpdateTemplate) {
        const templateId = await updateTemplate(
          workoutId,
          workout.name,
          prevWorkout.prevWorkoutId
        );
        const templateForRedux = await fetchTemplateExercises(
          workout.name,
          workoutId,
          new Date().toISOString().split("T")[0],
          templateId
        );
        const payload = {
          id: templateId,
          template: templateForRedux,
        };
        dispatch(updateTemplateRedux(payload));
      }
    } catch (e) {
      console.log(e);
    }
    navigation.goBack();
  }

  return (
    <TemplateMenuButtons
      workoutIsSame={workoutIsSame}
      handleFinishWorkout={handleFinishWorkout}
    />
  );
}
