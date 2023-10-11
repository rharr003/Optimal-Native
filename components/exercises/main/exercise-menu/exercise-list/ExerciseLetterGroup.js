import { View, Text, StyleSheet } from "react-native";
import AddExerciseExerciseItem from "./ExerciseItem";
import React from "react";
import { ColorPalette } from "../../../../../ColorPalette";

function AddExerciseLetterGroup({
  exerciseArr,
  letter,
  onPress,
  uniqueSelected,
  selectedExercises,
}) {
  return (
    <View>
      <Text style={styles.title}>{letter}</Text>
      {exerciseArr.map((exercise) => {
        return (
          <AddExerciseExerciseItem
            key={exercise.id}
            exercise={exercise}
            onPress={onPress}
            uniqueSelected={uniqueSelected}
            selectedExercises={selectedExercises}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    color: "#FFFFFF",
  },
});

export default React.memo(AddExerciseLetterGroup);
