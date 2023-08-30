import { View, StyleSheet, FlatList, Keyboard } from "react-native";
import { ColorPalette } from "../../../ui/ColorPalette";
import CustomButton from "../../../ui/CustomButton";
import { fetchExercises } from "../../../../util/sqlite/db";
import { useState, useEffect } from "react";
import AddExerciseModalLetterGroup from "./AddExerciseModalLetterGroup";
import { useDispatch } from "react-redux";
import {
  replaceExercise,
  bulkAddExercises,
} from "../../../../util/redux/workout";
import { fetchRecentExercisePerformance } from "../../../../util/sqlite/db";
import NewExerciseModal from "./NewExerciseModal";
import SearchBar from "./SearchBar";

export default function AddExerciseModal({ navigation, route }) {
  const [exercises, setExercises] = useState({});
  const [filteredExercises, setFilteredExercises] = useState({});
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState({ name: "", category: "" });
  const { isReplacing, index } = route.params;
  const dispatch = useDispatch();
  console.log("AddExerciseModal");

  useEffect(() => {
    fetchExercises().then((result) => {
      setExercises(result);
      if (isReplacing) {
        navigation.setOptions({
          title: "Replace Exercise",
        });
      }
    });
  }, []);

  useEffect(() => {
    // sets the header right button to add/replace if there are selected exercises
    if (selectedExercises.length > 0) {
      navigation.setOptions({
        headerRight: () => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomButton
              onPress={handleComplete}
              title={
                isReplacing
                  ? "Replace"
                  : "Add" + ` (${selectedExercises.length})`
              }
              iconName="checkmark-outline"
              style={{ padding: 0 }}
              textColor="#FFFFFF"
            />
          </View>
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
                    unit: prevSet.unit,
                    reps: "",
                    weight: "",
                    completed: false,
                  }))
                : [
                    {
                      reps: "",
                      weight: "",
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
                unit: prevSet.unit,
                reps: "",
                weight: "",
                completed: false,
              }))
            : [
                {
                  reps: "",
                  weight: "",
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
        setExercises={setExercises}
        setSelectedExercises={setSelectedExercises}
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
          <AddExerciseModalLetterGroup
            exerciseArr={
              (search.name === "" && search.category === ""
                ? exercises
                : filteredExercises)[item]
            }
            letter={item}
            setSelectedExercises={setSelectedExercises}
            isReplacing={isReplacing}
            selectedExercises={selectedExercises}
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
