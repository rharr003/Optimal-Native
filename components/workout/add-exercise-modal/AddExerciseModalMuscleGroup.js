import { View, Text, Pressable, StyleSheet } from "react-native";
import { ColorPalette } from "../../ui/ColorPalette";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import AddExerciseModalExerciseItem from "./AddExerciseModalExerciseItem";

export default function AddExerciseModalMuscleGroup({
  exerciseArr,
  muscleGroup,
  handleSelect,
}) {
  const sortedArr = exerciseArr.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <View>
      <Text style={styles.title}>{muscleGroup}</Text>
      {sortedArr.map((exercise) => {
        return (
          <AddExerciseModalExerciseItem
            key={exercise.id}
            exercise={exercise}
            handleSelect={handleSelect}
            muscleGroup={muscleGroup}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.dark.gray900,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pressablePressed: {
    opacity: 0.5,
    backgroundColor: ColorPalette.dark.secondary700,
  },

  selected: {
    opacity: 1,
    backgroundColor: ColorPalette.dark.secondary700,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    color: "#FFFFFF",
  },

  text: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});
