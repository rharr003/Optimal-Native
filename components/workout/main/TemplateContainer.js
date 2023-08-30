import { View, StyleSheet, Text, FlatList } from "react-native";
import TemplateItem from "./TemplateItem";
import { useEffect, useState } from "react";
import {
  fetchTemplates,
  fetchTemplateExercises,
  fetchTemplateExercisesFormatted,
} from "../../../util/sqlite/db";
import { useIsFocused } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import TemplateModals from "../modals/template-modal/TemplateModals";
import CustomButton from "../../ui/CustomButton";
import { ColorPalette } from "../../ui/ColorPalette";

export default function TemplateContainer() {
  const [templates, setTemplates] = useState([]);
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [loadedWorkout, setLoadedWorkout] = useState(null);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  useEffect(() => {
    async function fetch() {
      const templatesToFetch = await fetchTemplates();
      const promises = [];
      templatesToFetch.forEach((template) => {
        promises.push(
          fetchTemplateExercises(template.name, template.workout_id)
        );
      });
      const templates = await Promise.all(promises);
      setTemplates(templates);
    }
    if (isFocused) {
      fetch();
    }
  }, [isFocused]);
  function handleModalClose() {
    setShowModal(false);
    setLoadedWorkout(null);
    setTemplateToEdit(null);
  }

  function handleNameEdit(template) {
    setTemplateToEdit(template);
    setShowModal(true);
  }

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
    setLoadedWorkout(fullWorkoutData);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowModal(true);
  }
  return (
    <View style={styles.centeredView}>
      <TemplateModals
        setTemplates={setTemplates}
        showModal={showModal}
        handleClose={handleModalClose}
        loadedWorkout={loadedWorkout}
        templateToEdit={templateToEdit}
      />
      <Text style={styles.title}>Templates:</Text>
      <FlatList
        data={templates}
        numColumns={2}
        renderItem={({ item }) => (
          <TemplateItem
            template={item}
            handleSelect={handleSelect}
            setTemplates={setTemplates}
            handleNameEdit={handleNameEdit}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
});
