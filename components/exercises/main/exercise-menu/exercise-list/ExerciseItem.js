import { Pressable, Text, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import React from "react";
import { ColorPalette } from "../../../../../ColorPalette";

function AddExerciseExerciseItem({
  exercise,
  onPress,
  uniqueSelected,
  selectedExercises,
}) {
  const isInSelected = selectedExercises.some(
    (item) => item.id === exercise.id
  );

  const [selected, setSelected] = useState(isInSelected);
  function handlePress() {
    onPress(exercise, setSelected);
  }

  // for some reason the state doesnt update properly on rerender so you have to make sure the state and isInSelected are in sync
  useEffect(() => {
    setSelected(isInSelected);
  }, [isInSelected]);

  useEffect(() => {
    if (uniqueSelected) {
      if (uniqueSelected !== exercise.id) {
        setSelected(false);
      }
    }
  }, [uniqueSelected]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        selected && styles.selected,
      ]}
      onPress={handlePress}
    >
      <View style={styles.exerciseName}>
        <Text style={styles.text}>
          {exercise.name + " "}
          <Text>
            {exercise.equipment !== "body" && exercise.equipment !== "static"
              ? `(${
                  exercise.equipment[0].toUpperCase() +
                  exercise.equipment.slice(1)
                })`
              : ""}
          </Text>
        </Text>
      </View>
      {selected ? <Ionicons name="checkmark" size={20} color="#fff" /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.dark.gray900,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
  },

  exerciseName: {
    alignItems: "left",
    justifyContent: "center",
    maxWidth: "80%",
  },
  text: {
    color: "#fff",
    fontSize: 20,
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

export default React.memo(AddExerciseExerciseItem);
