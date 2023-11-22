import { View, StyleSheet } from "react-native";
import ExerciseMenuMain from "./exercise-menu/ExerciseMenuMain";
import { insertExercise } from "../../../util/sqlite/db";
import { useDispatch } from "react-redux";
import { addExercise } from "../../../util/redux/slices/exercises";

export default function ExercisesMain({ navigation }) {
  const dispatch = useDispatch();
  function onPress(exercise, setSearch) {
    // lazy fix:  avoid a deleted exercise being shown due to an active search
    setSearch({ name: "", category: "" });
    navigation.navigate("exerciseDetails", { exercise });
  }

  async function onAddNewExercise(name, equipment, bodyPart) {
    try {
      const newId = await insertExercise(name, equipment, bodyPart);

      const letter = name[0].toUpperCase();
      // update redux store with new exercise
      dispatch(
        addExercise({
          newExercise: {
            name,
            equipment,
            muscleGroup: bodyPart,
            id: newId,
            restTime: 60,
          },
          letterGroup: letter,
        })
      );
    } catch (e) {
      console.log(e);
    }
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
