import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ui/ColorPalette";
import AddExerciseModalExerciseItem from "./AddExerciseModalExerciseItem";
import React from "react";

function AddExerciseModalLetterGroup({
  exerciseArr,
  letter,
  setSelectedExercises,
  selectedExercises,
  isReplacing,
}) {
  return (
    <View>
      <Text style={styles.title}>{letter}</Text>
      {exerciseArr.map((exercise) => {
        return (
          <AddExerciseModalExerciseItem
            key={exercise.id}
            exercise={exercise}
            setSelectedExercises={setSelectedExercises}
            isReplacing={isReplacing}
            idOfSelectedForReplacing={selectedExercises[0]?.id}
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

export default React.memo(AddExerciseModalLetterGroup);
