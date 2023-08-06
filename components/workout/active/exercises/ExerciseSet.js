import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../../ui/ColorPalette";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import { stopRestTimer, startRestTimer } from "../../../../util/restTimer";
import React from "react";

function ExerciseSet({
  set,
  setNum,
  setSets,
  restTime,
  setShowRestTimerModal,
}) {
  const dispatch = useDispatch();

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

  // function handleComplete() {
  //   completeSet(setNum - 1);
  // }
  return (
    <>
      <View
        style={[styles.tableRow, set.completed ? styles.completedView : null]}
      >
        <Text style={[styles.tableCellExtraSmall, styles.text]}>{setNum}</Text>
        <Text style={[styles.tableCellWide, styles.text]}>
          {set.prevWeight ? `${set.prevWeight} x ${set.prevReps}` : "N/A"}
        </Text>
        <View style={styles.tableCellRegular}>
          <TextInput
            style={[styles.input]}
            keyboardType="numeric"
            value={set.weight}
            onChangeText={(text) => handleChangeText(text, "weight")}
            placeholder={set.prevWeight ? set.prevWeight : ""}
          />
        </View>
        <View style={styles.tableCellSmall}>
          <TextInput
            style={[styles.input, { width: "80%" }]}
            keyboardType="numeric"
            value={set.reps}
            onChangeText={(text) => handleChangeText(text, "reps")}
            placeholder={set.prevReps ? set.prevReps : ""}
          />
        </View>
        <Pressable
          style={[
            styles.tableCellExtraSmall,
            styles.checkBox,
            set.completed ? styles.checkBoxComplete : null,
          ]}
          onPress={handleComplete}
        >
          <Ionicons
            name="checkmark-outline"
            size={24}
            color="white"
            style={{ margin: 0, padding: 0 }}
          />
        </Pressable>
      </View>
      <View style={[styles.deleteView]}>
        <Ionicons
          name="trash-outline"
          size={30}
          color={"#FFFFFF"}
          style={{ marginLeft: 25 }}
        />
      </View>
    </>
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

  deleteView: {
    backgroundColor: ColorPalette.dark.error,
    width: "100%",
    justifyContent: "center",
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
});

export default React.memo(ExerciseSet);
