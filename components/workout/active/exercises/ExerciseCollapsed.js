import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";

export default function ExerciseCollapsed({ name }) {
  return <Text style={styles.text}>{name}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: ColorPalette.dark.secondary200,
    fontSize: 26,
    textAlign: "center",
  },
});
