import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";

export default function Bmi({ bmi }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current BMI:</Text>
      <Text style={styles.text}>{bmi ? bmi.toFixed(1) : "No Data"}</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
});
