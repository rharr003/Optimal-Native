import { TextInput, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateWorkoutName } from "../../../util/redux/workout";

export default function WorkoutHeaderTitle() {
  const workoutName = useSelector((state) => state.workout.workout.name);
  const dispatch = useDispatch();

  function handleChangeText(text) {
    dispatch(updateWorkoutName({ name: text }));
  }
  return (
    <TextInput
      style={styles.text}
      value={workoutName}
      onChangeText={handleChangeText}
      returnKeyType="done"
      maxLength={24}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
