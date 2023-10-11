import { View, StyleSheet } from "react-native";
import ExerciseMenuMain from "./exercise-menu/ExerciseMenuMain";
import { insertExercise } from "../../../util/sqlite/db";
import { useDispatch } from "react-redux";
import { addExercise } from "../../../util/redux/slices/exercises";

export default function ExercisesMain({ navigation }) {
  const dispatch = useDispatch();
  function onPress(exercise) {
    navigation.navigate("exerciseDetails", { exercise });
  }

  async function onAddNewExercise(name, equipment, bodyPart) {
    const newExercise = await insertExercise(name, equipment, bodyPart);
    const letter = name[0].toUpperCase();
    // update redux store with new exercise
    dispatch(addExercise({ newExercise, letterGroup: letter }));
  }

  return (
    <View style={styles.container}>
      <ExerciseMenuMain onPress={onPress} onAddNewExercise={onAddNewExercise} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
