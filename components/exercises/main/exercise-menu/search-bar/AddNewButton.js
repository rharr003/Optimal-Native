import { StyleSheet } from "react-native";
import CustomButton from "../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../ColorPalette";

export default function AddNewButton({ onPress }) {
  return (
    <CustomButton
      title="Add New"
      iconName="add-outline"
      color={ColorPalette.dark.gray900}
      textColor="#FFFFFF"
      style={styles.buttonStyle}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: "48%",
    padding: 5,
    height: 35,
    justifyContent: "space-between",
    paddingHorizontal: "10%",
    margin: 0,
  },
});
