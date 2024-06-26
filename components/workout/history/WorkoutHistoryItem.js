import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import { formatTime } from "../../../util/formatTime";

export default function WorkoutHistoryItem({ workout }) {
  let date = new Date(workout.date);
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const fullDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={[styles.text, styles.date]}>{fullDate}</Text>
      </View>
      <View style={styles.exerciseContainer}>
        {workout.exercises.map((exercise) => {
          return (
            <View key={Math.random()}>
              <Text style={styles.text}>
                {exercise.name}{" "}
                {exercise.equipment !== "Body" &&
                exercise.equipment !== "Static"
                  ? `(${exercise.equipment})`
                  : ""}
              </Text>
              {exercise.sets.map((set, idx) => (
                <View
                  style={styles.set}
                  key={exercise.id + workout.date + idx + Math.random()}
                >
                  <Text style={styles.setText}>{idx + 1} -</Text>
                  <View style={styles.setInfo}>
                    <Text style={styles.setText}>
                      {parseInt(set.weight)
                        ? `${set.weight} ${set.unit} (x${set.reps})`
                        : `${set.reps} reps`}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          );
        })}
      </View>

      <Text style={[styles.text, styles.date]}>
        {formatTime(workout.duration, true)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: ColorPalette.dark.gray800,
    borderBottomWidth: 1,
    borderColor: ColorPalette.dark.secondary200,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
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
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
    marginVertical: 10,
    textAlign: "left",
  },

  date: {
    color: ColorPalette.dark.gray400,
  },

  set: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 125,
  },

  setInfo: {
    flexDirection: "row",
    width: 125,
  },
  setText: {
    fontSize: 16,
    color: ColorPalette.dark.gray400,
    marginVertical: 3,
  },
});
