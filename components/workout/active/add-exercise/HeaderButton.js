import { View, StyleSheet } from "react-native";
import CustomButton from "../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentExercisePerformance } from "../../../../util/sqlite/db";
import {
  clearSelectedExercises,
  bulkAddExercises,
  replaceExercise,
} from "../../../../util/redux/slices/workout";
import { useNavigation } from "@react-navigation/native";

export default function HeaderButton({
  indexForReplacing,
  isReplacing,
  idBeingReplaced,
}) {
  const selectedExercises = useSelector(
    (state) => state.workout.selectedExercises
  );
  const length = Object.keys(selectedExercises).length;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function onPress() {
    try {
      const keys = Object.keys(selectedExercises);
      if (isReplacing) {
        const exercise = selectedExercises[keys[0]];
        const recentExercisePerformance = await fetchRecentExercisePerformance(
          exercise.id
        );

        dispatch(
          replaceExercise({
            index: indexForReplacing,
            oldId: idBeingReplaced,
            exercise: {
              id: exercise.id,
              name: exercise.name,
              restTime: exercise.restTime,
            },
            sets:
              recentExercisePerformance.length > 0
                ? recentExercisePerformance.map((prevSet) => ({
                    prevWeight: prevSet.weight,
                    prevReps: prevSet.reps,
                    prevUnit: prevSet.unit,
                    unit: prevSet.unit,
                    reps: "",
                    weight: "",
                    completed: false,
                  }))
                : [
                    {
                      reps: "",
                      weight: "",
                      prevUnit: null,
                      unit: "lbs",
                      prevWeight: null,
                      prevReps: null,
                      completed: false,
                    },
                  ],
          })
        );
        navigation.navigate("main");
      } else {
        const promiseArray = [];
        keys.forEach((key, idx) => {
          promiseArray.push(
            fetchRecentExercisePerformance(selectedExercises[key].id)
          );
        });
        const recentExercisePerformance = await Promise.all(promiseArray);

        const data = {
          exercises: keys.map((key) => {
            return selectedExercises[key];
          }),
          setsArray: keys.map((key, idx) => ({
            id: selectedExercises[key].reactId,
            sets:
              recentExercisePerformance[idx].length > 0
                ? recentExercisePerformance[idx].map((prevSet) => ({
                    prevWeight: prevSet.weight.toString(),
                    prevReps: prevSet.reps.toString(),
                    prevUnit: prevSet.unit,
                    unit: prevSet.unit,
                    reps: "",
                    weight: "",
                    completed: false,
                  }))
                : [
                    {
                      reps: "",
                      weight: "",
                      prevUnit: null,
                      unit: "lbs",
                      prevWeight: null,
                      prevReps: null,
                      completed: false,
                    },
                  ],
          })),
        };
        dispatch(bulkAddExercises(data));
        navigation.goBack();
      }
      dispatch(clearSelectedExercises());
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.container}>
      <CustomButton
        title={isReplacing ? "Replace" : length > 0 ? `Add (${length})` : "Add"}
        onPress={onPress}
        style={styles.button}
        textColor={ColorPalette.dark.secondary200}
        iconName={isReplacing ? "swap-horizontal-outline" : "add-outline"}
        disabled={length < 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    padding: 0,
  },
});
