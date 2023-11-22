import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertExercise } from "../../../../util/sqlite/db";
import ExerciseMenuMain from "../../../exercises/main/exercise-menu/ExerciseMenuMain";
import HeaderButton from "./HeaderButton";
import { addExercise } from "../../../../util/redux/slices/exercises";
import {
  addSelectedExercise,
  clearSelectedExercises,
} from "../../../../util/redux/slices/workout";

export default function AddExercise({ navigation, route }) {
  const { index, idBeingReplaced } = route.params;
  const isReplacing = useSelector((state) => state.workout.isReplacing);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isReplacing) {
      navigation.setOptions({
        title: "Replace Exercise",
      });
    }
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          isReplacing={isReplacing}
          indexForReplacing={index}
          idBeingReplaced={idBeingReplaced}
        />
      ),
    });

    return () => {
      dispatch(clearSelectedExercises());
    };
  }, []);

  async function onAddNewExercise(name, equipment, bodyPart) {
    try {
      if (name === "" || equipment === "" || bodyPart === "") return;
      const newId = await insertExercise(name.trim(), equipment, bodyPart);

      const newExercise = {
        name: name.trim(),
        equipment,
        muscleGroup: bodyPart,
        id: newId,
        restTime: 60,
      };

      dispatch(
        addExercise({
          newExercise,
          letterGroup: newExercise.name[0].toUpperCase(),
        })
      );
      dispatch(
        addSelectedExercise({
          id: newExercise.id,
          exercise: {
            ...newExercise,
            reactId: newExercise.id + Date.now(),
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <ExerciseMenuMain onAddNewExercise={onAddNewExercise} onPress={null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
