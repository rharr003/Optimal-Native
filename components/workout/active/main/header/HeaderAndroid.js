import WorkoutName from "./WorkoutName";
import FinishWorkoutButton from "./FinishWorkoutButton";
import WorkoutTimers from "../../../shared/WorkoutTimers";
import { View, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";
import CustomButton from "../../../../shared/ui/CustomButton";

export default function HeaderAndroid({ goBack, handleFinish }) {
  return (
    <View style={styles.container}>
      <CustomButton
        onPress={goBack}
        iconName="arrow-back-outline"
        textColor={ColorPalette.dark.gray100}
        style={styles.buttonStyle}
      />

      <WorkoutName />
      <WorkoutTimers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: ColorPalette.dark.gray700,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },
});
