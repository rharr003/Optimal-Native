import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Target({ label, calories, color }) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: color }]}>{label}</Text>
      </View>
      <View style={styles.calorieContainer}>
        <Text style={[styles.calorie, { color: color }]}>{calories}</Text>
        <Ionicons name="flame" size={16} color={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  labelContainer: {
    width: "50%",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  label: {
    fontSize: 16,
    color: ColorPalette.dark.secondary200,
  },

  calorieContainer: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  calorie: {
    fontSize: 16,
    color: ColorPalette.dark.secondary200,
    marginRight: 5,
  },
});
