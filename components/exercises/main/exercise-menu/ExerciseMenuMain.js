import { View, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import SearchBar from "./search-bar/SearchBar";
import { useState, useEffect } from "react";
import { fetchExercises } from "../../../../util/sqlite/db";
import ExerciseListMain from "./exercise-list/ExerciseListMain";
import AddOrEditExerciseModalMain from "../../../shared/modals/add-or-edit-exercise/AddOrEditExerciseModalMain";
import { useDispatch, useSelector } from "react-redux";
import { setExercises } from "../../../../util/redux/slices/exercises";
import { ColorPalette } from "../../../../ColorPalette";
import * as Haptics from "expo-haptics";

export default function ExerciseMenuMain({ onPress, onAddNewExercise }) {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const [filteredExercises, setFilteredExercises] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ name: "", category: "" });

  useEffect(() => {
    async function fetch() {
      const result = await fetchExercises();

      dispatch(setExercises(result || {}));
      setLoading(false);
    }
    try {
      fetch();
    } catch (e) {
      console.log(e);
    }
  }, []);

  function handleAddModalOpen() {
    // clear search so that when the modal is closed, the newly added exercise will show up first
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSearch({ name: "", category: "" });
    Keyboard.dismiss();
    setShowAddModal(true);
  }

  function Loader() {
    return (
      <View style={styles.backdrop}>
        <ActivityIndicator color={ColorPalette.dark.gray500} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AddOrEditExerciseModalMain
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onComplete={onAddNewExercise}
      />
      <SearchBar
        search={search}
        setSearch={setSearch}
        exercises={exercises}
        setFilteredExercises={setFilteredExercises}
        handleAddModalOpen={handleAddModalOpen}
      />
      {loading ? (
        <Loader />
      ) : (
        <ExerciseListMain
          search={search}
          setSearch={setSearch}
          exercises={exercises}
          filteredExercises={filteredExercises}
          onPress={onPress}
        />
      )}
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

  backdrop: {
    backgroundColor: ColorPalette.dark.gray900,
    flex: 1,
    justifyContent: "center",
  },
});
