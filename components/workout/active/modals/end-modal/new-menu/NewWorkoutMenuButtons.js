import CustomButton from "../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../ColorPalette";
import { StyleSheet } from "react-native";

export default function NewWorkoutMenuButtons({ finishAsTemplate, finish }) {
  return (
    <>
      <CustomButton
        title="Finish (Save as template)"
        onPress={finishAsTemplate}
        iconName={"save-outline"}
        style={styles.buttonStyle}
        color={ColorPalette.dark.primary200}
        textColor="#000000"
      />
      <CustomButton
        title="Finish"
        onPress={finish}
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
