import { View, Text, StyleSheet } from "react-native";
import WorkoutHeaderTimer from "../active/WorkoutHeaderTimers";
import { useSelector } from "react-redux";
import { ColorPalette } from "../../ui/ColorPalette";
import { useEffect } from "react";

export default function WorkoutHomeActiveWorkoutLabel() {
  const { name } = useSelector((state) => state.workout.workout);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{name}</Text>
        <WorkoutHeaderTimer color={"#000000"} overRideRestTimer={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: ColorPalette.dark.secondary200,
    borderRadius: 5,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  text: {
    color: "#000000",
    fontSize: 18,
  },
});
