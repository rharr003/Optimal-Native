import { View, StyleSheet, AppState } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import KeyboardSpacer from "react-native-keyboard-spacer";
import WorkoutExerciseList from "./exercises/ExerciseList";
import React from "react";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setTimeClosed, decrementRestTimer } from "../../../util/restTimer";

export default function WorkoutActiveMain({ onFocus, toggleExerciseModal }) {
  const isFocused = useIsFocused();
  const appState = AppState.currentState;
  const dispatch = useDispatch();
  const timeClosed = useSelector((state) => state.restTimer.timeClosed);

  // re-enables the swipe to close gesture when the component is focused
  useEffect(() => {
    if (isFocused) {
      onFocus();
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, [isFocused]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (newAppState) => {
      if (newAppState === "active") {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
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
      <WorkoutExerciseList toggleExerciseModal={toggleExerciseModal} />
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
