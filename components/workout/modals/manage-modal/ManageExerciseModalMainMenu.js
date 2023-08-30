import { View, Text, Pressable, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ui/ColorPalette";
import ManageModalItem from "./ManageModalItem";
import { removeExercise } from "../../../../util/redux/workout";
import { updateExerciseRestTime } from "../../../../util/sqlite/db";
import { updateExerciseRestTime as updateRestTimeState } from "../../../../util/redux/workout";
import { formatTime } from "../../../../util/formatTime";
import { useDispatch } from "react-redux";
import { useState } from "react";
import RestTimePicker from "./RestTimePicker";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function ManageExerciseModalMainMenu({ index, handleClose }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const exercise = useSelector(
    (state) => state.workout.workout.exercises[index]
  );
  const [showPicker, setShowPicker] = useState(false);

  async function closePicker(value) {
    if (value === exercise.restTime || !value) return;
    await updateExerciseRestTime(exercise.id, value);
    dispatch(updateRestTimeState({ id: exercise.id, restTime: value }));
    setShowPicker(false);
  }

  function toggleExerciseModal() {
    navigation.navigate("addExercise", { isReplacing: true, index });
  }

  return (
    <>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{exercise.name}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.closeIcon,
            pressed && styles.closeIconPressed,
          ]}
          onPress={handleClose}
        >
          <Ionicons name="close-outline" size={30} color="#FFFFFF" />
        </Pressable>
      </View>
      {showPicker && (
        <RestTimePicker close={closePicker} restTime={exercise.restTime} />
      )}
      <ManageModalItem
        title="Replace Exercise"
        icon={"swap-horizontal-outline"}
        iconColor={ColorPalette.dark.secondary200}
        onPress={(e) => {
          toggleExerciseModal(e, {
            isReplacing: true,
            index,
            exercise,
          });
          handleClose();
        }}
      />

      <ManageModalItem
        title="Change Unit"
        icon={"barbell-outline"}
        iconColor={ColorPalette.dark.secondary200}
        onPress={() => {}}
        rightText={exercise.unit}
      />

      <ManageModalItem
        title="Edit Rest Time"
        icon={"time-outline"}
        iconColor={ColorPalette.dark.secondary200}
        onPress={
          () => setShowPicker((prev) => !prev)
          // navigation.navigate("EditRestTime", { index, exercise })
        }
        rightText={formatTime(exercise.restTime)}
      />

      <ManageModalItem
        title="Remove Exercise"
        icon={"trash-outline"}
        iconColor={ColorPalette.dark.error}
        onPress={() => {
          dispatch(removeExercise({ id: exercise.id, index }));
          handleClose();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "75%",
    height: "40%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },

  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    backgroundColor: ColorPalette.dark.gray600,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
    marginLeft: 10,
  },

  closeIcon: {
    borderRadius: 10,
  },

  closeIconPressed: {
    backgroundColor: ColorPalette.dark.gray700,
  },
});
