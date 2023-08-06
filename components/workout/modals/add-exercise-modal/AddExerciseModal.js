import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { ColorPalette } from "../../../ui/ColorPalette";
import CustomButton from "../../../ui/CustomButton";
import { fetchExercises } from "../../../../util/db";
import { useState, useEffect } from "react";
import AddExerciseModalLetterGroup from "./AddExerciseModalLetterGroup";
import { useDispatch } from "react-redux";
import { replaceExercise, bulkAddExercises } from "../../../../util/workout";
import { fetchRecentExercisePerformance } from "../../../../util/db";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AddExerciseModal({ navigation, route }) {
  const [exercises, setExercises] = useState({});
  const [filteredExercises, setFilteredExercises] = useState({});
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [search, setSearch] = useState("");
  const { isReplacing, index } = route.params;
  const dispatch = useDispatch();

  function handleSearch(text) {
    setSearch(text);
    const filteredExercises = Object.keys(exercises).reduce(
      (filteredExercises, muscleGroup) => {
        const filteredMuscleGroupExercises = exercises[muscleGroup].filter(
          (exercise) => exercise.name.toLowerCase().includes(text.toLowerCase())
        );
        if (filteredMuscleGroupExercises.length > 0) {
          filteredExercises[muscleGroup] = filteredMuscleGroupExercises;
        }
        return filteredExercises;
      },
      {}
    );
    setFilteredExercises(filteredExercises);
  }

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
      }));
      dispatch(bulkAddExercises(exercisesToAdd));
      navigation.goBack();
    }
  }

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
    if (selectedExercises.length > 0) {
      navigation.setOptions({
        headerRight: () => (
          <CustomButton
            onPress={handleComplete}
            title={isReplacing ? "Replace" : "Add"}
            iconName="checkmark-outline"
            color="transparent"
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [selectedExercises]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={ColorPalette.dark.gray500}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={ColorPalette.dark.gray500}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => handleSearch(text)}
          value={search}
        />
      </View>
      <FlatList
        style={styles.exerciseContainer}
        data={Object.keys(search === "" ? exercises : filteredExercises)}
        renderItem={({ item }) => (
          <AddExerciseModalLetterGroup
            exerciseArr={(search === "" ? exercises : filteredExercises)[item]}
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

  input: {
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 5,
    padding: 10,
    width: "90%",
    color: "#FFFFFF",
    fontSize: 18,
  },

  searchContainer: {
    marginVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  exerciseContainer: {
    height: "90%",
    width: "100%",
  },
});
