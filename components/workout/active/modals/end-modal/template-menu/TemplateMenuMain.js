import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { stopWorkout } from "../../../../../../util/redux/slices/workout";
import { stopRestTimer } from "../../../../../../util/redux/slices/restTimer";
import {
  updateTemplate as updateTemplateRedux,
  reorderTemplates,
} from "../../../../../../util/redux/slices/templates";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cancelRestTimerNotifications } from "../../../../../../util/app-state/restTimerNotification";

export default function TemplateMenuMain({ workout, name }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const prevWorkout = useSelector((state) => state.workout.prevWorkout);
  const [workoutIsSame, setWorkoutIsSame] = useState(true);

  useEffect(() => {
    setWorkoutIsSame(checkWorkoutDidNotChange(workout, prevWorkout));
  }, [workout]);

  async function handleFinishWorkout(shouldUpdateTemplate = false) {
    try {
      cancelRestTimerNotifications();
      dispatch(stopWorkout());
      dispatch(stopRestTimer());
      const volume = calculateWorkoutVolume(workout);
      dispatch(
        updateAfterWorkout({ duration: workout.duration, volume: volume })
      );
      const workoutId = await insertWorkout(
        name,
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
          name,
          prevWorkout.prevWorkoutId
        );
        const templateForRedux = await fetchTemplateExercises(
          name,
          workoutId,
          new Date().toISOString().split("T")[0],
          templateId
        );
        const payload = {
          id: templateId,
          template: templateForRedux,
          prevWorkoutId: prevWorkout.prevWorkoutId,
        };
        dispatch(updateTemplateRedux(payload));
      } else {
        dispatch(
          reorderTemplates({ prevWorkoutId: prevWorkout.prevWorkoutId })
        );
      }
    } catch (e) {
      console.log(e);
    }
    AsyncStorage.removeItem("prevState");
    navigation.goBack();
  }

  return (
    <TemplateMenuButtons
      workoutIsSame={workoutIsSame}
      handleFinishWorkout={handleFinishWorkout}
    />
  );
}
