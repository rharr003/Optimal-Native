import { View, Text, StyleSheet } from "react-native";
import CurrentWeight from "./current-weight/CurrentWeight";
import { ColorPalette } from "../../../../../ColorPalette";

export default function WeightHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Report:</Text>
      <CurrentWeight />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },
});
