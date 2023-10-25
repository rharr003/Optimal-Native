import { useEffect, useState } from "react";
import {
  fetchTemplates,
  fetchTemplateExercises,
  fetchTemplateExercisesFormatted,
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
      const promises = [];
      templatesToFetch.forEach((template) => {
        promises.push(
          fetchTemplateExercises(
            template.name,
            template.workout_id,
            template.date
          )
        );
      });
      const fetchedTemplates = await Promise.all(promises);
      dispatch(populateTemplates(fetchedTemplates));
    }

    fetch();
  }, []);

  async function handleSelect(template) {
    const exerciseNames = template.exercises.map((exercise) => exercise.name);
    const fullExerciseData = await fetchTemplateExercisesFormatted(
      template.id,
      exerciseNames
    );
    const fullWorkoutData = {
      name: template.name,
      isTemplate: true,
      prevWorkoutId: template.id,
      duration: 0,
      exercises: fullExerciseData,
    };
    dispatch(setLoadedWorkout(fullWorkoutData));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowModal(true);
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
