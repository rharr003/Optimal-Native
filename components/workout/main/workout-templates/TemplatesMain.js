import { useEffect, useState } from "react";
import {
  fetchTemplates,
  fetchTemplateExercises,
  fetchTemplateExercisesFormatted,
} from "../../../../util/sqlite/db";
import TemplateModals from "./modals/TemplateModals";
import TemplateList from "./template-list/TemplateList";
import * as Haptics from "expo-haptics";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  populateTemplates,
  setLoadedWorkout,
} from "../../../../util/redux/slices/templates";

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
          fetchTemplateExercises(template.name, template.workout_id)
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowModal(true);
  }

  return (
    <View style={styles.container}>
      <TemplateModals showModal={showModal} setShowModal={setShowModal} />
      <TemplateList
        templates={templates}
        handleSelect={handleSelect}
        setShowModal={setShowModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },
});
