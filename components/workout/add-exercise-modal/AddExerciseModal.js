import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { ColorPalette } from "../../ui/ColorPalette";
import CustomButton from "../../ui/CustomButton";
import { fetchExercises } from "../../../util/db";
import { useState, useEffect } from "react";
import AddExerciseModalMuscleGroup from "./AddExerciseModalMuscleGroup";
import { useDispatch } from "react-redux";
import { addExercise, replaceExercise } from "../../../util/workout";
import { fetchRecentExercisePerformance } from "../../../util/db";
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

  function handleComplete() {
    selectedExercises.forEach(async (exercise, idx) => {
      const recentExercisePerformance = await fetchRecentExercisePerformance(
        exercise.id
      );
      if (isReplacing) {
        dispatch(
          replaceExercise({
            index: index,
            exercise: {
              id: exercise.id,
              name: exercise.name,
              unit: "lbs",
              sets:
                recentExercisePerformance.length > 0
                  ? recentExercisePerformance.map((prevSet) => ({
                      prevWeight: prevSet.weight,
                      prevReps: prevSet.reps,
                      reps: "",
                      weight: "",
                      completed: false,
                    }))
                  : [
                      {
                        reps: "",
                        weight: "",
                        prevWeight: null,
                        prevReps: null,
                        completed: false,
                      },
                    ],
            },
          })
        );
      } else {
        dispatch(
          addExercise({
            id: exercise.id,
            name: exercise.name,
            restTime: exercise.restTime,
            unit: "lbs",
            sets:
              recentExercisePerformance.length > 0
                ? recentExercisePerformance.map((prevSet) => ({
                    prevWeight: prevSet.weight,
                    prevReps: prevSet.reps,
                    reps: "",
                    weight: "",
                    completed: false,
                  }))
                : [
                    {
                      reps: "",
                      weight: "",
                      prevWeight: null,
                      prevReps: null,
                      completed: false,
                    },
                  ],
          })
        );
      }

      if (idx === selectedExercises.length - 1) {
        if (isReplacing) navigation.navigate("main");
        else navigation.goBack();
      }
    });
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

  function handleSelect(id, muscleGroup) {
    setSelectedExercises((selectedExercises) => {
      const exercise = exercises[muscleGroup].find(
        (exercise) => exercise.id === id
      );
      if (selectedExercises.find((exercise) => exercise.id === id)) {
        return selectedExercises.filter((exercise) => exercise.id !== id);
      } else {
        if (isReplacing) return [exercise];
        else return [...selectedExercises, exercise];
      }
    });
  }
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
          <AddExerciseModalMuscleGroup
            exerciseArr={(search === "" ? exercises : filteredExercises)[item]}
            muscleGroup={item}
            handleSelect={handleSelect}
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
