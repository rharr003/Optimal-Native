import { View, Text, StyleSheet } from "react-native";
import ExerciseList from "./exercise-list/ExerciseList";
import { insertExercise } from "../../util/sqlite/db";

export default function ExercisesMain({ navigation }) {
  function onPress(exercise, setSelected) {
    navigation.navigate("exerciseDetails", { exercise });
  }

  function onInit() {
    return;
  }

  async function onAdd(name, equipment, bodyPart, setExercises) {
    const newExercise = await insertExercise(name, equipment, bodyPart);
    const letter = name[0].toUpperCase();

    setExercises((prevExercises) => {
      if (prevExercises[letter]) {
        return {
          ...prevExercises,
          [letter]: [
            ...prevExercises[letter],
            { ...newExercise, defaultSelected: false },
          ].sort((a, b) => a.name.localeCompare(b.name)),
        };
      } else {
        return {
          ...prevExercises,
          [letter]: [newExercise],
        };
      }
    });
  }

  return (
    <View style={styles.container}>
      <ExerciseList onPress={onPress} onInit={onInit} onAdd={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
