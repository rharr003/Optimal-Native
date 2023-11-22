import { View, StyleSheet } from "react-native";
import {
  addSet as addSetRedux,
  removeSet as removeSetRedux,
  toggleUnit as toggleUnitRedux,
} from "../../../../../../util/redux/slices/workout";
import { stopRestTimer } from "../../../../../../util/redux/slices/restTimer";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import ActiveModalsMain from "../../../modals/active-modal/ActiveModalsMain";
import SetListMain from "./set-list/SetListMain";
import { useSelector } from "react-redux";
import { cancelRestTimerNotifications } from "../../../../../../util/app-state/restTimerNotification";

function ExerciseMain({ exercise, index }) {
  const dispatch = useDispatch();
  const sets = useSelector(
    (state) => state.workout.workout.exerciseSets[exercise.reactId]
  );
  const [showManageExerciseModal, setShowManageExerciseModal] = useState(false);
  const [showRestTimerModal, setShowRestTimerModal] = useState(false);
  const [idxRemoved, setIdxRemoved] = useState([]);
  const activeIdx = useSharedValue(null);
  const [unit, setUnit] = useState(sets[0]?.unit);

  function addSet() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(addSetRedux({ id: exercise.reactId, unit: unit }));
  }

  function removeSet(index) {
    // adds index of the removed item to the idxRemoved array to force re-initialization of the corresponding set container to reset the shared values for the deletion animation so the set is not hidden upon re-render
    setIdxRemoved((idxRemoved) => [...idxRemoved, index]);
    dispatch(removeSetRedux({ id: exercise.reactId, setIndex: index }));
  }

  function handleManageExerciseModalOpen() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowManageExerciseModal(true);
  }

  function handleManageExerciseModalClose() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowManageExerciseModal(false);
  }

  function finishRestTimer() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowRestTimerModal(false);
    cancelRestTimerNotifications();
    dispatch(stopRestTimer());
  }

  function toggleUnit(unit) {
    const newUnit = unit === "lbs" ? "kg" : "lbs";
    dispatch(toggleUnitRedux({ id: exercise.reactId, newUnit: newUnit }));
    setUnit(newUnit);
  }

  return (
    <View style={styles.container}>
      <ActiveModalsMain
        exerciseToEditIdx={index}
        showManageExerciseModal={showManageExerciseModal}
        showRestTimerModal={showRestTimerModal}
        setShowRestTimerModal={setShowRestTimerModal}
        handleManageExerciseModalClose={handleManageExerciseModalClose}
        finishRestTimer={finishRestTimer}
        toggleUnit={toggleUnit}
        unit={unit}
      />
      <SetListMain
        sets={sets}
        idxRemoved={idxRemoved}
        handleModalToggle={handleManageExerciseModalOpen}
        unit={unit}
        removeSet={removeSet}
        activeIdx={activeIdx}
        setIdxRemoved={setIdxRemoved}
        exercise={exercise}
        setShowRestTimerModal={setShowRestTimerModal}
        addSet={addSet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ExerciseMain);
