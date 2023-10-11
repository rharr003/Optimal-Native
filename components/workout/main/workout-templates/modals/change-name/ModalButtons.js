import { View, StyleSheet } from "react-native";
import CustomButton from "../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function ModalButtons({ handleSave, handleClose }) {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Save"
        color={ColorPalette.dark.secondary200}
        textColor="#FFFFFF"
        style={styles.button}
        onPress={handleSave}
      />
      <CustomButton
        title="Cancel"
        color={ColorPalette.dark.gray500}
        textColor="#FFFFFF"
        style={styles.button}
        onPress={handleClose}
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
