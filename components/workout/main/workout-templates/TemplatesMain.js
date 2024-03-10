import { useEffect, useState } from "react";
import {
  fetchTemplates,
  fetchTemplateExercises,
  fetchTemplateExercisesFormatted,
  fetchRecentExercisePerformance,
} from "../../../../util/sqlite/db";
import TemplateModals from "./modals/TemplateModals";
import TemplateList from "./template-list/TemplateList";
import * as Haptics from "expo-haptics";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  populateTemplates,
  setLoadedWorkout,
} from "../../../../util/redux/slices/templates";
import { ColorPalette } from "../../../../ColorPalette";

export default function TemplatesMain() {
  const templates = useSelector((state) => state.templates.templates);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  // fetch templates from db on initial load and save to redux store
  useEffect(() => {
    async function fetch() {
      const templatesToFetch = await fetchTemplates();
      if (templatesToFetch && templatesToFetch.length) {
        const promises = [];
        templatesToFetch.forEach((template) => {
          promises.push(
            fetchTemplateExercises(
              template.name,
              template.workout_id,
              template.date,
              template.id
            )
          );
        });
        const fetchedTemplates = await Promise.all(promises);
        dispatch(
          populateTemplates(
            fetchedTemplates.filter((template) => template !== null)
          )
        );
      }
    }
    try {
      fetch();
    } catch (e) {
      console.log(e);
    }
  }, []);

  async function handleSelect(template) {
    try {
      const exerciseNames = template.exercises.map((exercise) => exercise.name);
      let fullExerciseData = await fetchTemplateExercisesFormatted(
        template.prevWorkoutId,
        exerciseNames
      );
      const promiseArray = [];
      fullExerciseData.forEach((exercise) => {
        promiseArray.push(fetchRecentExercisePerformance(exercise.exercise.id));
      });
      const previousPerformances = await Promise.all(promiseArray);

      fullExerciseData = fullExerciseData.map((exercise, idx) => {
        const updatedExercise = {
          ...exercise,
          sets: exercise.sets.map((set, setIdx) => {
            if (setIdx > previousPerformances[idx].length - 1) {
              return set;
            }
            const updatedSet = {
              ...set,
              prevWeight: previousPerformances[idx][setIdx].weight.toString(),
              prevReps: previousPerformances[idx][setIdx].reps.toString(),
            };
            return updatedSet;
          }),
        };
        return updatedExercise;
      });

      const fullWorkoutData = {
        name: template.name,
        isTemplate: true,
        prevWorkoutId: template.prevWorkoutId,
        duration: 0,
        exercisesNew: fullExerciseData.map((data) => data.exercise),
        exerciseSets: {},
      };

      fullExerciseData.forEach((data) => {
        fullWorkoutData.exerciseSets[data.exercise.reactId] = data.sets;
      });

      dispatch(setLoadedWorkout(fullWorkoutData));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setShowModal(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Templates</Text>
      </View>
      <TemplateModals showModal={showModal} setShowModal={setShowModal} />
      <View style={styles.innerContainer}>
        {templates.length ? (
          <TemplateList
            templates={templates}
            handleSelect={handleSelect}
            setShowModal={setShowModal}
          />
        ) : (
          <Text style={[styles.title, styles.italic]}>No Templates Saved</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },

  innerContainer: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  titleContainer: {
    width: "100%",
    paddingLeft: 20,
  },

  title: {
    color: ColorPalette.dark.secondary200,
    fontSize: 24,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 10,
  },

  italic: {
    color: ColorPalette.dark.gray700,
    fontStyle: "italic",
    fontSize: 24,
  },
});
