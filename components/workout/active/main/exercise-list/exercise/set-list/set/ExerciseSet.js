import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../../../../../../../ColorPalette";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import {
  stopRestTimer,
  startRestTimer,
} from "../../../../../../../../util/redux/slices/restTimer";
import React from "react";

function ExerciseSet({
  set,
  setNum,
  setSets,
  restTime,
  setShowRestTimerModal,
  equipment,
}) {
  const dispatch = useDispatch();
  const useAltLayout = equipment === "static" || equipment === "body";
  function handleChangeText(text, type) {
    setSets((prevSets) => {
      const newSet = prevSets.map((set, setIndex) => {
        if (setIndex === setNum - 1) {
          return {
            ...set,
            [type]: text,
          };
        }
        return set;
      });
      return newSet;
    });
  }

  function handleComplete() {
    if (!setCanBeCompleted()) {
      return;
    }
    if (!set.completed) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      dispatch(stopRestTimer());
      setTimeout(() => {
        dispatch(startRestTimer({ restTime }));
        setShowRestTimerModal(true);
      }, 100);
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
      dispatch(stopRestTimer());
    }

    setSets((prevSets) => {
      const newSet = prevSets.map((set, setIndex) => {
        if (setIndex === setNum - 1) {
          return {
            ...set,
            completed: !set.completed,
          };
        }
        return set;
      });
      return newSet;
    });
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
      return set.reps !== "";
    }

    return set.weight !== "" && set.reps !== "";
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
            onChangeText={(text) => handleChangeText(text, "weight")}
            placeholder={set.prevWeight ? set.prevWeight.toString() : ""}
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
          onChangeText={(text) => handleChangeText(text, "reps")}
          placeholder={set.prevReps ? set.prevReps.toString() : ""}
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
    backgroundColor: ColorPalette.dark.gray900,
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
    backgroundColor: ColorPalette.dark.gray900,
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
