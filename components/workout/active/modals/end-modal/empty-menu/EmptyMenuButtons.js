import CustomButton from "../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../ColorPalette";
import { StyleSheet } from "react-native";

export default function EmpytMenuButtons({ handleCancelWorkout }) {
  return (
    <CustomButton
      title="Cancel Workout"
      onPress={handleCancelWorkout}
      iconName={"trash-outline"}
      style={styles.buttonStyle}
      color={ColorPalette.dark.error}
      textColor="#000000"
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 0,
    marginBottom: 10,
    paddingVertical: 5,
    width: "90%",
  },
});
