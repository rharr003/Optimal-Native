import CustomButton from "../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../ColorPalette";
import { StyleSheet, View } from "react-native";

export default function WorkoutFooterButtons({
  openAddExercise,
  cancelWorkout,
}) {
  return (
    <View style={styles.footer}>
      <CustomButton
        title="Add Exercise"
        color={ColorPalette.dark.secondary200}
        iconName={"add-outline"}
        onPress={openAddExercise}
        style={styles.buttonStyle}
        textColor="#000000"
      />
      <CustomButton
        title="Cancel Workout"
        color={ColorPalette.dark.error}
        iconName={"trash-outline"}
        onPress={cancelWorkout}
        style={styles.buttonStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    marginVertical: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    width: "95%",
    paddingVertical: 5,
  },
});
