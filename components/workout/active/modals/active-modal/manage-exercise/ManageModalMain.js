import { View, Text, Pressable, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import { removeExercise } from "../../../../../../util/redux/slices/workout";
import { updateExerciseRestTime } from "../../../../../../util/sqlite/db";
import { updateExerciseRestTime as updateRestTimeState } from "../../../../../../util/redux/slices/workout";
import { useDispatch } from "react-redux";
import { useState } from "react";
import RestTimePicker from "./rest-time-picker/RestTimePicker";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ItemList from "./manage-modal-items/ItemList";
import CenteredModal from "../../../../../shared/modals/CenteredModal";

export default function ManageModalMain({
  index,
  handleClose,
  toggleUnit,
  unit,
  showModal,
}) {
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
    navigation.navigate("addExercise", {
      isReplacing: true,
      index,
      id: exercise.id,
      letterGroup: exercise.name[0].toUpperCase(),
    });
    handleClose();
  }

  function handleToggleUnit() {
    toggleUnit(unit);
    handleClose();
  }

  function handleRemove() {
    dispatch(removeExercise({ id: exercise.id, index }));
    handleClose();
  }

  return (
    <CenteredModal showModal={showModal} handleClose={handleClose}>
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
      <ItemList
        setShowPicker={setShowPicker}
        handleToggleUnit={handleToggleUnit}
        handleRemove={handleRemove}
        toggleExerciseModal={toggleExerciseModal}
        unit={unit}
        exercise={exercise}
      />
    </CenteredModal>
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
