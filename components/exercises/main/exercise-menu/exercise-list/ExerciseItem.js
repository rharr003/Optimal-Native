import { Pressable, Text, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { ColorPalette } from "../../../../../ColorPalette";
import { useSelector, useDispatch } from "react-redux";
import {
  addSelectedExercise,
  removeSelectedExercise,
} from "../../../../../util/redux/slices/workout";

function AddExerciseExerciseItem({ exercise, onPress, setSearch }) {
  const dispatch = useDispatch();
  //access by key to avoid every exercise from re-rendering everytime another exercise is added or deleted for redux selection
  const exerciseInRedux = useSelector(
    (state) => state.workout.selectedExercises[exercise.id]
  );
  const selected = exerciseInRedux ? true : false;

  function handlePress() {
    // override default behavior if onPress function is provided
    if (onPress) {
      onPress(exercise, setSearch);
      return;
    }
    if (!selected) {
      dispatch(
        addSelectedExercise({
          id: exercise.id,
          exercise: { ...exercise, reactId: exercise.id + Date.now() },
        })
      );
    } else {
      dispatch(removeSelectedExercise({ id: exercise.id }));
    }
  }

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
