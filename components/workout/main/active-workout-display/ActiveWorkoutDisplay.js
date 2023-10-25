import { View, Text, StyleSheet, Pressable } from "react-native";
import WorkoutTimers from "../../shared/WorkoutTimers";
import { useSelector } from "react-redux";
import { ColorPalette } from "../../../../ColorPalette";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ActiveWorkoutDisplay({ interval, navigation }) {
  const { name } = useSelector((state) => state.workout.workout);

  function handleContinueWorkout() {
    navigation.navigate("active", { interval: interval });
  }
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={handleContinueWorkout}
    >
      <View style={styles.innerContainer}>
        <View style={styles.row}>
          <Ionicons name={"enter-outline"} size={24} color={"#000000"} />
          <Text style={styles.text}>{name}</Text>
        </View>
        <WorkoutTimers color={"#000000"} overRideRestTimer={true} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    backgroundColor: ColorPalette.dark.secondary200,
    borderRadius: 15,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    width: "100%",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 18,
    marginLeft: 10,
  },

  pressed: {
    opacity: 0.5,
  },
});
