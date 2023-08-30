import { View, StyleSheet, FlatList, AppState } from "react-native";
import { ColorPalette } from "../../../ui/ColorPalette";
import CustomButton from "../../../ui/CustomButton";
import { bulkUpdateSets } from "../../../../util/redux/workout";
import { stopRestTimer } from "../../../../util/redux/restTimer";
import { useDispatch } from "react-redux";
import ExerciseSetTableHeader from "./ExerciseSetTableHeader";
import React, { useState, useEffect, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import WorkoutModals from "../../modals/WorkoutModals";
import { useNavigation } from "@react-navigation/native";
import SwipeToDeleteView from "../../../ui/SwipeToDeleteView";
import ExerciseSet from "./ExerciseSet";

function Exercise({ exercise, index, dragIsActive, isFinishing }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // use local state to prevent entire exercise list from re-rendering when a set is updated
  const [sets, setSets] = useState(exercise.sets);
  const [appState, setAppState] = useState(AppState.currentState);
  const [showManageExerciseModal, setShowManageExerciseModal] = useState(false);
  const [showRestTimerModal, setShowRestTimerModal] = useState(false);
  const [idxRemoved, setIdxRemoved] = useState([]);
  const persistedSets = useRef(exercise.sets);
  const activeIdx = useSharedValue(null);
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
      unit: sets[0].unit,
    });
    setSets(newSets);
    persistedSets.current = newSets;
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

  return (
    <View style={[styles.exercise]}>
      <WorkoutModals
        exerciseToEditIdx={index}
        showManageExerciseModal={showManageExerciseModal}
        showRestTimerModal={showRestTimerModal}
        setShowRestTimerModal={setShowRestTimerModal}
        handleManageExerciseModalClose={handleManageExerciseModalClose}
        finishRestTimer={finishRestTimer}
      />
      <ExerciseSetTableHeader
        handleModalToggle={handleManageExerciseModalOpen}
      />

      <FlatList
        data={sets}
        renderItem={({ item, index }) => (
          <SwipeToDeleteView
            index={index}
            removeSet={removeSet}
            activeIdx={activeIdx}
            idxRemoved={idxRemoved}
            setIdxRemoved={setIdxRemoved}
          >
            <ExerciseSet
              set={item}
              setNum={index + 1}
              setSets={setSets}
              restTime={exercise.restTime}
              setShowRestTimerModal={setShowRestTimerModal}
            />
          </SwipeToDeleteView>
        )}
        keyExtractor={(item, index) => {
          // forces re-initialization to reset shared values for the deletion animation when removed otherwise the container for the set will be hidden even though we have refreshed the set list in state. Causing the set to be hidden when it should be visible.
          if (idxRemoved.indexOf(index) !== -1) {
            return exercise.id + index + Math.random();
          } else {
            return exercise.id + index;
          }
        }}
      />
      <CustomButton
        title="Add Set"
        onPress={addSet}
        iconName="add-outline"
        color={ColorPalette.dark.gray900}
        textColor={"#FFFFFF"}
        style={{ padding: 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  exercise: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: ColorPalette.dark.gray300,
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
});

export default React.memo(Exercise);
