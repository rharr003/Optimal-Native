import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../../../../../../../ColorPalette";
import * as Haptics from "expo-haptics";
import {
  scheduleRestTimerNotification,
  cancelRestTimerNotifications,
} from "../../../../../../../../util/app-state/restTimerNotification";
import { useDispatch } from "react-redux";
import {
  stopRestTimer,
  startRestTimer,
} from "../../../../../../../../util/redux/slices/restTimer";
import {
  updateSet,
  completeSet,
} from "../../../../../../../../util/redux/slices/workout";
import React from "react";

function ExerciseSet({
  id,
  set,
  setNum,
  restTime,
  setShowRestTimerModal,
  equipment,
}) {
  const dispatch = useDispatch();
  const useAltLayout = equipment === "static" || equipment === "body";
  function handleChangeText(text, type) {
    const payload = {
      id: id,
      index: setNum - 1,
      type: type,
      text: text,
    };
    dispatch(updateSet(payload));
  }

  async function handleComplete() {
    if (!setCanBeCompleted()) {
      return;
    }
    if (!set.completed) {
      scheduleRestTimerNotification(restTime);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      dispatch(stopRestTimer());
      setTimeout(() => {
        dispatch(startRestTimer({ restTime }));
        setShowRestTimerModal(true);
      }, 100);
    } else {
      cancelRestTimerNotifications();
      dispatch(stopRestTimer());
    }

    dispatch(completeSet({ id: id, index: setNum - 1 }));
  }

  function createPrevPerformance() {
    if (equipment === "static") {
      return set.prevReps + " sec";
    }

    if (equipment === "body") {
      return set.prevReps + " reps";
    }

    return `${set.prevWeight} ${set.prevUnit} (x${set.prevReps})`;
  }

  function setCanBeCompleted() {
    if (useAltLayout) {
      return set.reps !== "" || set.templateReps;
    }

    return (
      (set.weight !== "" || set.templateWeight) &&
      (set.reps !== "" || set.templateReps)
    );
  }

  return (
    <View
      style={[styles.tableRow, set.completed ? styles.completedView : null]}
    >
      <Text style={[styles.tableCellExtraSmall, styles.text]}>{setNum}</Text>
      <Text style={[styles.tableCellWide, styles.text]}>
        {set.prevWeight || set.prevReps ? createPrevPerformance() : "N/A"}
      </Text>
      {!useAltLayout && (
        <View style={styles.tableCellRegular}>
          <TextInput
            style={[styles.input]}
            keyboardType="numeric"
            value={set.weight}
            maxLength={4}
            onChangeText={(text) => handleChangeText(text, "weight")}
            placeholder={
              set.templateWeight ? set.templateWeight.toString() : ""
            }
          />
        </View>
      )}

      <View
        style={useAltLayout ? styles.tableCellRegular : styles.tableCellSmall}
      >
        <TextInput
          style={[styles.input, { width: "80%" }]}
          keyboardType="numeric"
          value={set.reps}
          maxLength={3}
          onChangeText={(text) => handleChangeText(text, "reps")}
          placeholder={set.templateReps ? set.templateReps.toString() : ""}
        />
      </View>
      <Pressable
        style={[
          styles.tableCellExtraSmall,
          styles.checkBox,
          !setCanBeCompleted() ? styles.checkBoxDisabled : null,
          set.completed ? styles.checkBoxComplete : null,
        ]}
        onPress={handleComplete}
      >
        <Ionicons
          name="checkmark-outline"
          size={24}
          color="white"
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tableCellExtraSmall: {
    flex: 1,
    margin: 0,
    textAlign: "center",
    margin: 5,
  },
  tableCellSmall: {
    flex: 2,
    margin: 0,
    textAlign: "center",
    alignItems: "center",
  },

  checkBox: {
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 5,
    paddingVertical: 4,
    alignItems: "center",
  },

  checkBoxComplete: {
    backgroundColor: ColorPalette.dark.secondary200,
  },

  checkBoxDisabled: {
    opacity: 0.25,
  },

  tableCellRegular: {
    flex: 3,
    margin: 0,
    textAlign: "center",
    alignItems: "center",
  },

  tableCellWide: {
    flex: 4,
    margin: 5,
    textAlign: "center",
  },

  input: {
    borderRadius: 15,
    paddingVertical: 2,
    backgroundColor: ColorPalette.dark.gray800,
    width: "80%",
    textAlign: "center",
    color: "white",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#FFFFFF",
  },

  completedView: {
    backgroundColor: ColorPalette.dark.secondary700,
    opacity: 0.5,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  container: {
    flex: 1,
    flexDirection: "row",
  },

  icon: { margin: 0, padding: 0 },
});

export default React.memo(ExerciseSet);
