import { View, StyleSheet, AppState } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import KeyboardSpacer from "react-native-keyboard-spacer";
import WorkoutExerciseList from "./exercises/ExerciseList";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeClosed,
  decrementRestTimer,
} from "../../../util/redux/restTimer";
import WorkoutHeaderDoneButton from "./WorkoutHeaderDoneButton";
import { useNavigation } from "@react-navigation/native";
import CenteredModal from "../../shared/CenteredModal";
import EndWorkoutMainMenu from "../modals/end-workout-modal/EndWorkoutMainMenu";

export default function WorkoutActiveMain({ interval }) {
  const isFocused = useIsFocused();
  const appState = AppState.currentState;
  const dispatch = useDispatch();
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const timeClosed = useSelector((state) => state.restTimer.timeClosed);
  const navigation = useNavigation();

  function handleCloseModal() {
    setIsFinishing(false);
    setShowFinishModal(false);
  }

  function handleOpenModal() {
    setIsFinishing(true);
    setShowFinishModal(true);
  }

  useEffect(() => {
    if (isFocused) {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, [isFocused]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (newAppState) => {
      if (newAppState === "active") {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
    });
    navigation.setOptions({
      headerRight: () => (
        <WorkoutHeaderDoneButton handleOpenModal={handleOpenModal} />
      ),
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    if (timeClosed) {
      const timePassedInSeconds = Math.ceil(
        (new Date().getTime() - timeClosed) / 1000
      );
      dispatch(decrementRestTimer({ amount: timePassedInSeconds }));
    }

    return () => {
      dispatch(setTimeClosed());
    };
  }, []);

  return (
    <View style={styles.centeredView}>
      <CenteredModal
        showModal={showFinishModal}
        handleClose={handleCloseModal}
        style={{ height: "30%" }}
      >
        <EndWorkoutMainMenu handleClose={handleCloseModal} />
      </CenteredModal>
      <WorkoutExerciseList isFinishing={isFinishing} interval={interval} />
      <KeyboardSpacer />
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
