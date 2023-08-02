import { View, Text, StyleSheet } from "react-native";
import { formatTime } from "../../../util/formatTime";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  decrementRestTimer,
  stopRestTimer,
  incrementRestTimer,
} from "../../../util/workout";
import CustomButton from "../../ui/CustomButton";
import { ColorPalette } from "../../ui/ColorPalette";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useSharedValue, withTiming } from "react-native-reanimated";

export default function RestTimer({ handleClose }) {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.workout.restTimer);
  const initialTime = useSharedValue(time);

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        size={225}
        onComplete={handleClose}
        duration={time}
        colors={ColorPalette.dark.secondary200}
        trailColor={ColorPalette.dark.gray900}
      >
        {({ remainingTime, animatedColor }) => (
          <Text style={{ color: "#FFFFFF", fontSize: 40 }}>
            {formatTime(remainingTime)}
          </Text>
        )}
      </CountdownCircleTimer>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Skip"
          color={ColorPalette.dark.error}
          onPress={handleClose}
          iconName="barbell-outline"
          style={{ width: "25%" }}
        />
        <CustomButton
          title="30 sec"
          color={ColorPalette.dark.secondary200}
          onPress={() => dispatch(incrementRestTimer({ amount: 30 }))}
          iconName="add-circle-outline"
          style={{ width: "25%" }}
        />
        <CustomButton
          title="30 sec"
          color={ColorPalette.dark.secondary200}
          onPress={() => dispatch(decrementRestTimer({ amount: 30 }))}
          iconName="remove-circle-outline"
          style={{ width: "25%" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
