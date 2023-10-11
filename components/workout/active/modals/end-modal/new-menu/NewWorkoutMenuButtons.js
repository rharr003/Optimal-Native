import CustomButton from "../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../ColorPalette";
import { StyleSheet } from "react-native";

export default function NewWorkoutMenuButtons({ finishAsTemplate, finish }) {
  console.log(finish);
  console.log(finishAsTemplate);
  return (
    <>
      <CustomButton
        title="Finish and save as template"
        onPress={finishAsTemplate}
        iconName={"save-outline"}
        style={styles.buttonStyle}
        color={ColorPalette.dark.primary200}
        textColor="#FFFFFF"
      />
      <CustomButton
        title="Finish workout"
        onPress={finish}
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
