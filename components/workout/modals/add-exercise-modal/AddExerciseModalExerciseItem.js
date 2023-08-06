import { Pressable, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { ColorPalette } from "../../../ui/ColorPalette";
import React from "react";

function AddExerciseModalExerciseItem({
  exercise,
  setSelectedExercises,
  isReplacing,
  idOfSelectedForReplacing,
}) {
  const [selected, setSelected] = useState(false);

  const shouldBeSelected = () => {
    if (isReplacing) {
      return exercise.id === idOfSelectedForReplacing;
    } else {
      return selected;
    }
  };

  const toggleSelected = () => {
    // handleSelect(exercise.id, muscleGroup);
    setSelectedExercises((prevSelectedExercises) => {
      if (isReplacing) {
        if (selected) return [];
        return [{ ...exercise, reactId: exercise.id + Date.now() }];
      } else if (selected) {
        return prevSelectedExercises.filter((prevSelectedExercise) => {
          return prevSelectedExercise.id !== exercise.id;
        });
      } else {
        return [
          ...prevSelectedExercises,
          { ...exercise, reactId: exercise.id + Date.now() },
        ];
      }
    });

    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        shouldBeSelected() && styles.selected,
      ]}
      onPress={toggleSelected}
    >
      <Text style={styles.text}>{exercise.name}</Text>
      {shouldBeSelected() ? (
        <Ionicons name="checkmark" size={20} color="#fff" />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.dark.gray900,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: ColorPalette.dark.secondary700,
  },
  selected: {
    opacity: 1,
    backgroundColor: ColorPalette.dark.secondary700,
  },
});

export default React.memo(AddExerciseModalExerciseItem);
