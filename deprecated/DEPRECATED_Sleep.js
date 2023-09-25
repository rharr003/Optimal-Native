import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../ui/ColorPalette";

export default function Sleep() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7 Day Average: </Text>
      <Text>7hr 45min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: ColorPalette.dark.primary200,
    borderRadius: 10,
    height: 65,
    width: "95%",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
