import CustomButton from "../../../shared/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { stopWorkout } from "../../../../util/redux/workout";
import { stopRestTimer } from "../../../../util/redux/restTimer";
import { ColorPalette } from "../../../../ColorPalette";
import {
  insertWorkout,
  insertWorkoutExercise,
  updateTemplate,
} from "../../../../util/sqlite/db";
import { useState, useEffect } from "react";

export default function TemplateButtons({ workout }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const prevWorkout = useSelector((state) => state.workout.prevWorkout);
  const [workoutIsSame, setWorkoutIsSame] = useState(true);
  useEffect(() => {
    setWorkoutIsSame(checkWorkoutDidNotChange());
  }, [workout]);

  function checkWorkoutDidNotChange() {
    const namesAreSame = workout.name === prevWorkout.name;
    const exercisesAreSame = workout.exercises.every((exercise, index) => {
      if (exercise.id !== prevWorkout.exercises[index].id) {
        return false;
      }
      if (exercise.sets.length !== prevWorkout.exercises[index].sets.length) {
        return false;
      }
      return true;
    });
    const setsAreSame = workout.exercises.every((exercise, index) => {
      return exercise.sets.every((set, setIndex) => {
        if (
          set.weight !==
          prevWorkout.exercises[index].sets[setIndex].prevWeight.toString()
        ) {
          return false;
        }
        if (
          set.reps !==
          prevWorkout.exercises[index].sets[setIndex].prevReps.toString()
        ) {
          return false;
        }
        return true;
      });
    });
    return namesAreSame && exercisesAreSame && setsAreSame;
  }
  async function handleFinishWorkout(shouldUpdateTemplate = false) {
    dispatch(stopWorkout());
    dispatch(stopRestTimer());
    const workoutId = await insertWorkout(
      workout.name,
      workout.duration,
      new Date().toISOString().split("T")[0]
    );
    if (shouldUpdateTemplate) {
      await updateTemplate(workoutId, workout.name, workout.prevWorkoutId);
    }
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

    navigation.goBack();
  }
  return (
    <>
      {!workoutIsSame && (
        <CustomButton
          title="Finish and update template"
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
      )}
      <CustomButton
        title="Finish workout and discard changes"
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
