import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import { formatTime } from "../../../util/formatTime";

export default function WorkoutItem({ workout }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={styles.text}>
          {new Date(workout.date).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.exerciseContainer}>
        {workout.exercises.map((exercise) => (
          <Text style={styles.text} key={exercise.id + workout.date}>
            -{exercise.name} X {exercise.setCount}
          </Text>
        ))}
      </View>

      <Text style={styles.text}>{formatTime(workout.duration)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.dark.gray700,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  exerciseContainer: {
    width: "100%",
    marginVertical: 15,
  },

  titleView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },

  text: {
    fontSize: 16,
    color: ColorPalette.dark.gray400,
    marginVertical: 5,
    textAlign: "left",
  },
});
