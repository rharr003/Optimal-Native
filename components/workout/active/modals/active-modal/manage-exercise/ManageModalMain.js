import { View, Text, Pressable, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import {
  removeExercise,
  startReplacing,
} from "../../../../../../util/redux/slices/workout";
import { updateExerciseRestTime } from "../../../../../../util/sqlite/db";
import { updateExerciseRestTime as updateRestTimeState } from "../../../../../../util/redux/slices/workout";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ItemList from "./manage-modal-items/ItemList";
import CenteredModal from "../../../../../shared/modals/CenteredModal";
import * as Haptics from "expo-haptics";

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
    (state) => state.workout.workout.exercisesNew[index]
  );
  const [restTime, setRestTime] = useState(exercise.restTime);

  useEffect(() => {
    if (!showModal && exercise.restTime !== restTime) {
      close(restTime);
    }
  }, [showModal]);

  async function close(value) {
    try {
      if (value === exercise.restTime || !value) return;
      await updateExerciseRestTime(exercise.id, value);
      dispatch(updateRestTimeState({ id: exercise.id, restTime: value }));
    } catch (e) {
      console.log(e);
    }
  }

  function handleRestTimePickerChange(val) {
    if (val === restTime || !val) return;
    setRestTime(val);
  }

  function toggleExerciseModal() {
    navigation.navigate("addExercise", {
      index: index,
      idBeingReplaced: exercise.id,
    });
    dispatch(
      startReplacing({
        id: exercise.id,
        exercise: { ...exercise, reactId: exercise.id + Date.now() },
      })
    );
    handleClose();
  }

  function handleToggleUnit() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleUnit(unit);
  }

  function handleRemove() {
    dispatch(removeExercise({ id: exercise.id, index }));
    handleClose();
  }

  return (
    <CenteredModal
      style={{ height: 280 }}
      showModal={showModal}
      handleClose={handleClose}
    >
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
      <ItemList
        handleToggleUnit={handleToggleUnit}
        handleRemove={handleRemove}
        toggleExerciseModal={toggleExerciseModal}
        unit={unit}
        exercise={exercise}
        restTime={restTime}
        handleRestTimeChange={handleRestTimePickerChange}
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
