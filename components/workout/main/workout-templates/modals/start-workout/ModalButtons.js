import { View, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import CustomButton from "../../../../../shared/ui/CustomButton";

export default function ModalButtons({ handleStart, handleClose }) {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Start"
        iconName="flash-outline"
        onPress={handleStart}
        color={ColorPalette.dark.secondary200}
        style={styles.button}
      />
      <CustomButton
        title="Go Back"
        iconName="exit-outline"
        onPress={handleClose}
        color={ColorPalette.dark.gray500}
        style={styles.button}
        textColor="#FFFFFF"
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
