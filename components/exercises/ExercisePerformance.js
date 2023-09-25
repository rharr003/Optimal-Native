import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../ColorPalette";

export default function ExercisePerformance({ performance, index, equipment }) {
  const localDate = new Date(performance.date).toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.column, styles.bold]}>{index + 1}</Text>
      <View style={styles.column}>
        <Text style={styles.text}>
          {equipment === "body" && performance.reps + " reps"}
          {equipment === "static" && performance.reps + " secs"}
          {equipment !== "body" &&
            equipment !== "static" &&
            performance.weight + " lbs" + " (x " + performance.reps + ")"}
        </Text>
        {equipment !== "body" && equipment !== "static" && (
          <Text style={styles.smallText}>{localDate}</Text>
        )}
      </View>
      {equipment !== "body" && equipment !== "static" && (
        <Text style={[styles.text, styles.column]}>
          {Math.ceil(performance.predicted_max)} lbs
        </Text>
      )}
      {(equipment === "body" || equipment === "static") && (
        <Text style={[styles.text, styles.column]}>{localDate}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    alignItems: "center",
  },

  column: {
    width: "33%",
  },

  text: {
    fontSize: 16,
    color: ColorPalette.dark.gray400,
    textAlign: "center",
  },

  smallText: {
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "center",
    color: ColorPalette.dark.gray500,
  },

  bold: {
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },
});
