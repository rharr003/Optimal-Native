import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../ui/ColorPalette";
import TotalNumWorkouts from "./TotalNumWorkouts";
import TotalTime from "./TotalTime";
import TotalVolume from "./TotalVolume";

export default function AllTimeStats() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lifetime Stats:</Text>
      <View style={styles.innerContainer}>
        <TotalNumWorkouts />
        <TotalTime />
        <TotalVolume />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 25,
  },

  innerContainer: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: ColorPalette.dark.gray400,
  },
});