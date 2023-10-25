import { TextInput, StyleSheet, Pressable, View } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateWorkoutName } from "../../../../../util/redux/slices/workout";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../../../../ColorPalette";
import { useRef, useState } from "react";

export default function WorkoutName() {
  const workoutName = useSelector((state) => state.workout.workout.name);
  const dispatch = useDispatch();
  const input = useRef(null);

  function handleChangeText(text) {
    dispatch(updateWorkoutName({ name: text }));
  }

  function focusInput() {
    input.current.focus();
  }
  return (
    <Pressable
      onPress={focusInput}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Ionicons
        name="pencil-outline"
        size={18}
        color={ColorPalette.dark.secondary200}
      />

      <TextInput
        style={styles.input}
        value={workoutName}
        onChangeText={handleChangeText}
        returnKeyType="done"
        maxLength={24}
        ref={input}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  input: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    zIndex: 4,
  },
  pressed: {
    opacity: 0.5,
  },
});
