import { View, StyleSheet, AppState } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import KeyboardSpacer from "react-native-keyboard-spacer";
import WorkoutExerciseList from "./exercise-list/ExerciseList";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeClosed,
  decrementRestTimer,
} from "../../../../util/redux/slices/restTimer";
import FinishWorkoutButton from "./header/FinishWorkoutButton";
import { useNavigation } from "@react-navigation/native";
import CenteredModal from "../../../shared/modals/CenteredModal";
import EndWorkoutMain from "../modals/end-modal/EndWorkoutMain";

export default function WorkoutActiveMain({ interval }) {
  const isFocused = useIsFocused();
  const appState = AppState.currentState;
  const dispatch = useDispatch();
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const timeClosed = useSelector((state) => state.restTimer.timeClosed);
  const navigation = useNavigation();

  function handleCloseModal() {
    setIsFinishing(false);
    setShowFinishModal(false);
    setCancelling(false);
  }

  function handleOpenModal() {
    setIsFinishing(true);
    setShowFinishModal(true);
  }

  function handleCancel() {
    setIsFinishing(true);
    setShowFinishModal(true);
    setCancelling(true);
  }

  useEffect(() => {
    if (isFocused) {
      // cancels rest timer notifications if the user is on the active workout screen
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, [isFocused]);

  useEffect(() => {
    // cancel notifications for rest timer if app cycles to active as isFocused will not fire off based on active/background status.
    const subscription = AppState.addEventListener("change", (newAppState) => {
      if (newAppState === "active") {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
    });
    navigation.setOptions({
      headerRight: () => (
        <FinishWorkoutButton handleOpenModal={handleOpenModal} />
      ),
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    // update the rest timer to account for the amount of time that has passed since the user last opened the active screen if there was an active rest timer
    if (timeClosed) {
      const timePassedInSeconds = Math.ceil(
        (new Date().getTime() - timeClosed) / 1000
      );
      dispatch(decrementRestTimer({ amount: timePassedInSeconds }));
    }
    //set the current time closed in redux so we can update the rest timer if needed once the user comes back to this screen
    return () => {
      dispatch(setTimeClosed());
    };
  }, []);

  return (
    <View style={styles.centeredView}>
      <CenteredModal
        showModal={showFinishModal}
        handleClose={handleCloseModal}
        style={styles.modalStyle}
      >
        <EndWorkoutMain
          handleClose={handleCloseModal}
          cancelling={cancelling}
        />
      </CenteredModal>
      <WorkoutExerciseList
        isFinishing={isFinishing}
        interval={interval}
        handleCancel={handleCancel}
      />
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

  modalStyle: {
    height: "30%",
  },
});
