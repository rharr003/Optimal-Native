import { View, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import CustomButton from "../../../../../shared/ui/CustomButton";

export default function ModalButtons({ handleStart, handleClose }) {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Start Workout"
        iconName="flash-outline"
        onPress={handleStart}
        color={ColorPalette.dark.secondary200}
        style={styles.button}
      />
      <CustomButton
        title="Cancel"
        iconName="close-outline"
        onPress={handleClose}
        color={ColorPalette.dark.gray500}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    width: "45%",
    marginHorizontal: 0,
  },
});
