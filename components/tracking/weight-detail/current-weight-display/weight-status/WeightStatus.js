import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";

export default function WeightStatus({ bmi }) {
  function calculateWeightStatus() {
    if (bmi === 0) return "No Data";
    if (bmi >= 40) {
      return "Extremely Obese";
    } else if (bmi >= 30) {
      return "Obese";
    } else if (bmi >= 25) {
      return "Overweight";
    } else if (bmi >= 18.5) {
      return "Healthy";
    } else {
      return "Underweight";
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Status:</Text>
      <Text style={styles.text}>{calculateWeightStatus()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 10,
    color: ColorPalette.dark.secondary200,
  },

  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: ColorPalette.dark.secondary200,
  },
});
