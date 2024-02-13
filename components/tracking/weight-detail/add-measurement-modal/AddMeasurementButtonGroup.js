import CustomButton from "../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";
import { View, StyleSheet } from "react-native";

export default function AddMeasurementButtonGroup({
  handleSave,
  handleCancel,
}) {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Save"
        iconName="save-outline"
        color={ColorPalette.dark.secondary200}
        textColor="#000000"
        style={styles.buttonStyle}
        onPress={handleSave}
      />
      <CustomButton
        title="Cancel"
        iconName="exit-outline"
        color={ColorPalette.dark.gray600}
        textColor="#FFFFFF"
        style={styles.buttonStyle}
        onPress={handleCancel}
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

  buttonStyle: {
    width: "45%",
  },
});
