import { View, StyleSheet, AppState } from "react-native";
import { bulkUpdateSets } from "../../../../../../util/redux/slices/workout";
import { stopRestTimer } from "../../../../../../util/redux/slices/restTimer";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import ActiveModalsMain from "../../../modals/active-modal/ActiveModalsMain";
import SetListMain from "./set-list/SetListMain";

function ExerciseMain({ exercise, index, dragIsActive, isFinishing }) {
  const dispatch = useDispatch();
  // use local state to prevent entire exercise list from re-rendering when a set is updated
  const [sets, setSets] = useState(exercise.sets);
  const [appState, setAppState] = useState(AppState.currentState);
  const [showManageExerciseModal, setShowManageExerciseModal] = useState(false);
  const [showRestTimerModal, setShowRestTimerModal] = useState(false);
  const [idxRemoved, setIdxRemoved] = useState([]);
  const persistedSets = useRef(exercise.sets);
  const activeIdx = useSharedValue(null);
  const [unit, setUnit] = useState(exercise.sets[0].unit);
  // saves the sets to the redux store when the app goes into the background or inactive state

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (newAppState) => {
      if (newAppState.match(/inactive|background/)) {
        dispatch(
          bulkUpdateSets({
            reactId: exercise.reactId,
            sets: persistedSets.current,
          })
        );
      }
      setAppState(newAppState);
    });
    return () => {
      subscription.remove();
    };
  }, [appState]);

  // saves the sets to the redux store when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(
        bulkUpdateSets({
          reactId: exercise.reactId,
          sets: persistedSets.current,
        })
      );
    };
  }, []);

  // saves the sets to the persistedSets ref when the sets state changes
  useEffect(() => {
    persistedSets.current = sets;
  }, [sets]);

  // saves the sets to the redux store when the dragIsActive state changes to avoid losing set state when the user drags the exercise
  useEffect(() => {
    if (dragIsActive) {
      dispatch(
        bulkUpdateSets({
          reactId: exercise.reactId,
          sets: persistedSets.current,
        })
      );
    }
  }, [dragIsActive]);

  useEffect(() => {
    if (isFinishing) {
      dispatch(
        bulkUpdateSets({
          reactId: exercise.reactId,
          sets: persistedSets.current,
        })
      );
    }
  }, [isFinishing]);

  function addSet() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const newSets = [...sets];
    newSets.push({
      weight: "",
      reps: "",
      prevReps: null,
      prevWeight: null,
      completed: false,
      unit: unit,
    });
    setSets(newSets);
  }

  function removeSet(index) {
    // adds index of the removed item to the idxRemoved array to force re-initialization of the corresponding set container to reset the shared values for the deletion animation so the set is not hidden upon re-render
    setIdxRemoved((idxRemoved) => [...idxRemoved, index]);
    setSets((prevSets) => {
      const newSets = prevSets.filter((set, setIndex) => {
        return setIndex !== index;
      });
      return newSets;
    });
  }

  function handleManageExerciseModalOpen() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowManageExerciseModal(true);
  }

  function handleManageExerciseModalClose() {
    setShowManageExerciseModal(false);
  }

  function finishRestTimer() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowRestTimerModal(false);
    dispatch(stopRestTimer());
  }

  function toggleUnit(unit) {
    const newUnit = unit === "lbs" ? "kg" : "lbs";
    setSets((prevSets) => {
      const newSets = prevSets.map((set) => {
        return {
          ...set,
          unit: newUnit,
        };
      });
      return newSets;
    });
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
        setSets={setSets}
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
