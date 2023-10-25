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
          title="Finish (Update template)"
          onPress={finishAndUpdate}
          iconName={"save-outline"}
          style={styles.buttonStyle}
          color={ColorPalette.dark.secondary200}
          textColor="#000000"
        />
      )}
      <CustomButton
        title="Finish (Discard changes)"
        onPress={handleFinishWorkout}
        iconName={"flag-outline"}
        style={styles.buttonStyle}
        color={ColorPalette.dark.secondary200}
        textColor="#000000"
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
