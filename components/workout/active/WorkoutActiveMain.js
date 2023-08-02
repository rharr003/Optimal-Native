import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stopRestTimer } from "../../../util/workout";
import KeyboardSpacer from "react-native-keyboard-spacer";
import WorkoutModals from "./WorkoutModals";
import WorkoutExerciseList from "./ExerciseList";
import WorkoutActiveFooter from "./WorkoutActiveFooter";
import React from "react";

export default function WorkoutActiveMain({ onFocus, toggleExerciseModal }) {
  const isFocused = useIsFocused();
  const [showManageExerciseModal, setShowManageExerciseModal] = useState(false);
  const [exerciseToEditIdx, setExerciseToEditIdx] = useState(null);
  const showRestTimerModal = useSelector(
    (state) => state.workout.restTimerActive
  );

  const dispatch = useDispatch();

  function handleRestTimerClose() {
    dispatch(stopRestTimer());
  }

  function handleManageExerciseModalClose() {
    setExerciseToEditIdx(null);

    setShowManageExerciseModal(false);
  }

  function handleManageExerciseModalOpen(idx) {
    setExerciseToEditIdx(idx);
    setShowManageExerciseModal(true);
  }

  useEffect(() => {
    if (isFocused) {
      onFocus();
    }
  }, [isFocused]);

  return (
    <View style={styles.centeredView}>
      <WorkoutModals
        handleRestTimerClose={handleRestTimerClose}
        showRestTimerModal={showRestTimerModal}
        handleManageExerciseModalClose={handleManageExerciseModalClose}
        showManageExerciseModal={showManageExerciseModal}
        exerciseToEditIdx={exerciseToEditIdx}
        toggleExerciseModal={toggleExerciseModal}
      />
      <WorkoutExerciseList
        handleManageExerciseModalOpen={handleManageExerciseModalOpen}
      />
      <KeyboardSpacer />
      <WorkoutActiveFooter
        style={{ position: "absolute", bottom: 0 }}
        toggleExerciseModal={toggleExerciseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
