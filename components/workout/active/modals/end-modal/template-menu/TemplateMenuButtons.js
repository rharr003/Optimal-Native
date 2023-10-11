import CustomButton from "../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../ColorPalette";
import { StyleSheet } from "react-native";

export default function TemplateMenuButtons({
  workoutIsSame,
  handleFinishWorkout,
}) {
  function finishAndUpdate() {
    handleFinishWorkout(true);
  }
  return (
    <>
      {!workoutIsSame && (
        <CustomButton
          title="Finish and update template"
          onPress={finishAndUpdate}
          iconName={"save-outline"}
          style={styles.buttonStyle}
          color={ColorPalette.dark.primary200}
          textColor="#FFFFFF"
        />
      )}
      <CustomButton
        title="Finish workout and discard changes"
        onPress={handleFinishWorkout}
        iconName={"checkmark-outline"}
        style={styles.buttonStyle}
        color={ColorPalette.dark.secondary200}
        textColor="#FFFFFF"
      />
    </>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 10,
    marginTop: 0,
    paddingVertical: 3,
    width: "90%",
  },
});
