import { Pressable, Text, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { ColorPalette } from "../../ui/ColorPalette";
import React from "react";
import { useEffect } from "react";

function AddExerciseExerciseItem({ exercise, onPress, uniqueSelected }) {
  const [selected, setSelected] = useState(exercise.defaultSelected || false);
  function handlePress() {
    onPress(exercise, setSelected);
  }

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
      <View
        style={{
          alignItems: "left",
          justifyContent: "center",
          maxWidth: "80%",
        }}
      >
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
