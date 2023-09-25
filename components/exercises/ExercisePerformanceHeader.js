import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../ColorPalette";

export default function ExercisePerformanceHeader({ thirdColumnName }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>Rank</Text>
      <Text style={[styles.text]}>Set</Text>
      <Text style={[styles.text]}>{thirdColumnName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: "center",
  },

  text: {
    fontSize: 18,
    color: ColorPalette.dark.gray400,
    textAlign: "center",
    fontWeight: "bold",
    width: "33%",
  },
});
