import { View, Text, StyleSheet, FlatList, Keyboard } from "react-native";
import SearchBar from "./SearchBar";
import ExerciseLetterGroup from "./ExerciseLetterGroup";
import { useState, useEffect } from "react";
import { fetchExercises, insertExercise } from "../../../util/sqlite/db";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import NewExerciseModal from "./NewExerciseModal";

export default function ExerciseList({
  onPress,
  uniqueSelected,
  onAdd,
  exerciseToReplaceInfo,
}) {
  const [exercises, setExercises] = useState({});
  const [filteredExercises, setFilteredExercises] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState({ name: "", category: "" });
  useEffect(() => {
    async function fetch() {
      const exercises = await fetchExercises();
      // allows us to have the exercises that is being replace preselected
      if (exerciseToReplaceInfo?.id) {
        const newExercises = {
          ...exercises,
          [exerciseToReplaceInfo.letterGroup]: exercises[
            exerciseToReplaceInfo.letterGroup
          ].map((exercise) => {
            if (exercise.id === exerciseToReplaceInfo.id) {
              return { ...exercise, defaultSelected: true };
            } else {
              return exercise;
            }
          }),
        };
        setExercises(newExercises);
        return;
      }
      setExercises(exercises);
      //   onInit(setExercises);
    }
    fetch();
  }, []);
  function handleAddModalOpen() {
    // clear search so that when the modal is closed, the newly added exercise will show up first
    setSearch({ name: "", category: "" });
    Keyboard.dismiss();
    setShowAddModal(true);
  }

  return (
    <View style={styles.container}>
      <NewExerciseModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onAdd={onAdd}
        setExercises={setExercises}
      />
      <SearchBar
        search={search}
        setSearch={setSearch}
        exercises={exercises}
        setFilteredExercises={setFilteredExercises}
        handleAddModalOpen={handleAddModalOpen}
      />
      <FlatList
        style={styles.exerciseContainer}
        data={Object.keys(
          search.name === "" && search.category === ""
            ? exercises
            : filteredExercises
        )}
        renderItem={({ item }) => (
          <ExerciseLetterGroup
            letter={item}
            exerciseArr={
              (search.name === "" && search.category === ""
                ? exercises
                : filteredExercises)[item]
            }
            onPress={onPress}
            uniqueSelected={uniqueSelected}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  exerciseContainer: {
    height: "90%",
    width: "100%",
  },
});
