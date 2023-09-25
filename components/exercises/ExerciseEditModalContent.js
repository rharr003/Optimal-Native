import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../ColorPalette";

export default function ExerciseEditModalContent({ exercise }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text]}>Equipment:</Text>
        <View style={styles.secondaryRow}>
          <Text style={[styles.text, styles.textSmall]}>
            {exercise.equipment}
          </Text>
          <Ionicons
            name="lock-closed-outline"
            size={18}
            color={ColorPalette.dark.gray400}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text]}>Muscle Group:</Text>
        <View style={styles.secondaryRow}>
          <Text style={[styles.text, styles.textSmall]}>
            {exercise.muscleGroup}
          </Text>
          <Ionicons
            name="lock-closed-outline"
            size={18}
            color={ColorPalette.dark.gray400}
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },

  icon: {
    marginLeft: 5,
  },

  text: {
    fontSize: 20,
    color: "#FFFFFF",
  },

  textSmall: {
    fontSize: 18,
    color: ColorPalette.dark.gray400,
  },

  secondaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
