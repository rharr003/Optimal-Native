import { View, StyleSheet, FlatList, Keyboard } from "react-native";
import SearchBar from "./SearchBar";
import ExerciseLetterGroup from "./ExerciseLetterGroup";
import { useState, useEffect } from "react";
import { fetchExercises } from "../../../util/sqlite/db";
import AddOrEditExerciseModal from "../../shared/AddOrEditExerciseModal";
import { useIsFocused } from "@react-navigation/native";

export default function ExerciseList({
  onPress,
  uniqueSelected,
  onCompleteModal,
  exerciseToReplaceInfo,
}) {
  const [exercises, setExercises] = useState({});
  const [filteredExercises, setFilteredExercises] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState({ name: "", category: "" });
  const isFocused = useIsFocused();
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
    if (isFocused) {
      fetch();
    }
  }, [isFocused]);
  function handleAddModalOpen() {
    // clear search so that when the modal is closed, the newly added exercise will show up first
    setSearch({ name: "", category: "" });
    Keyboard.dismiss();
    setShowAddModal(true);
  }

  return (
    <View style={styles.container}>
      <AddOrEditExerciseModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onComplete={onCompleteModal}
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
