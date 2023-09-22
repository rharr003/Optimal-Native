import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { replaceExercise, bulkAddExercises } from "../../../util/redux/workout";
import {
  fetchRecentExercisePerformance,
  insertExercise,
  fetchExercise,
} from "../../../util/sqlite/db";
import ExerciseList from "../../exercises/exercise-list/ExerciseList";
import HeaderButton from "./HeaderButton";

export default function AddExercise({ navigation, route }) {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { isReplacing, index, id, letterGroup } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isReplacing) {
      async function fetch() {
        const exerciseToReplace = await fetchExercise(id);

        setSelectedExercises([exerciseToReplace]);
      }

      fetch();
      navigation.setOptions({
        title: "Replace Exercise",
      });
    }
  }, []);

  useEffect(() => {
    // sets the header right button to add/replace if there are selected exercises
    if (selectedExercises.length > 0) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderButton isReplacing={isReplacing} onPress={handleComplete} />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [selectedExercises]);

  async function handleComplete() {
    if (isReplacing) {
      const recentExercisePerformance = await fetchRecentExercisePerformance(
        selectedExercises[0].id
      );

      dispatch(
        replaceExercise({
          index: index,
          exercise: {
            id: selectedExercises[0].id,
            name: selectedExercises[0].name,
            restTime: selectedExercises[0].restTime,
            sets:
              recentExercisePerformance.length > 0
                ? recentExercisePerformance.map((prevSet) => ({
                    prevWeight: prevSet.weight,
                    prevReps: prevSet.reps,
                    prevUnit: prevSet.unit,
                    unit: prevSet.unit,
                    reps: "",
                    weight: "",
                    completed: false,
                  }))
                : [
                    {
                      reps: "",
                      weight: "",
                      prevUnit: null,
                      unit: "lbs",
                      prevWeight: null,
                      prevReps: null,
                      completed: false,
                    },
                  ],
          },
        })
      );
      navigation.navigate("main");
    } else {
      const promiseArray = [];
      selectedExercises.forEach((exercise, idx) => {
        promiseArray.push(fetchRecentExercisePerformance(exercise.id));
      });
      const recentExercisePerformance = await Promise.all(promiseArray);
      const exercisesToAdd = selectedExercises.map((exercise, idx) => ({
        ...exercise,
        sets:
          recentExercisePerformance[idx].length > 0
            ? recentExercisePerformance[idx].map((prevSet) => ({
                prevWeight: prevSet.weight.toString(),
                prevReps: prevSet.reps.toString(),
                prevUnit: prevSet.unit,
                unit: prevSet.unit,
                reps: "",
                weight: "",
                completed: false,
              }))
            : [
                {
                  reps: "",
                  weight: "",
                  prevUnit: null,
                  unit: "lbs",
                  prevWeight: null,
                  prevReps: null,
                  completed: false,
                },
              ],
      }));
      dispatch(bulkAddExercises(exercisesToAdd));
      navigation.goBack();
    }
  }

  async function onAdd(name, equipment, bodyPart, setExercises) {
    if (name === "" || equipment === "" || bodyPart === "") return;
    const exercise = await insertExercise(name.trim(), equipment, bodyPart);
    setExercises((prevExercises) => {
      let newExercises = [];
      if (prevExercises.New) {
        newExercises = [
          ...prevExercises.New,
          { ...exercise, defaultSelected: true },
        ];
        // need to delete the New property from prevExercises so that the current value for New is not overwritten
        delete prevExercises.New;
      } else {
        newExercises = [{ ...exercise, defaultSelected: true }];
      }
      return {
        New: newExercises.sort((a, b) => a.name.localeCompare(b.name)),
        ...prevExercises,
      };
    });
    // only allow 1 exercise to be selected if isReplacing
    if (isReplacing) {
      setSelectedExercises([
        { ...exercise, reactId: exercise.id + Date.now() },
      ]);
    } else {
      setSelectedExercises((prevSelectedExercises) => {
        return [
          ...prevSelectedExercises,
          { ...exercise, reactId: exercise.id + Date.now() },
        ];
      });
    }
  }

  function onPress(exercise, setSelected) {
    setSelected((selected) => !selected);
    if (isReplacing) {
      setSelectedExercises([
        {
          ...exercise,
          reactId: exercise.id + Date.now(),
        },
      ]);
    } else {
      setSelectedExercises((prevSelectedExercises) => {
        if (
          prevSelectedExercises.filter(
            (prevSelectedExercise) => prevSelectedExercise.id === exercise.id
          ).length > 0
        ) {
          return prevSelectedExercises.filter(
            (prevSelectedExercise) => prevSelectedExercise.id !== exercise.id
          );
        } else {
          return [
            ...prevSelectedExercises,
            {
              ...exercise,
              reactId: exercise.id + Date.now(),
            },
          ];
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <ExerciseList
        onAdd={onAdd}
        onPress={onPress}
        exerciseToReplaceInfo={{ letterGroup, id }}
        uniqueSelected={isReplacing ? selectedExercises[0]?.id : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});