import { StyleSheet, Dimensions } from "react-native";
import { ColorPalette } from "../ui/ColorPalette";
import SelectDropdown from "react-native-select-dropdown";

const windowWidth = Dimensions.get("window").width;

export default function GenderSelector({ handleChange, userData }) {
  function parseButtonText(selectedItem) {
    return `Biological Sex: ${selectedItem}`;
  }
  return (
    <SelectDropdown
      data={["Male", "Female"]}
      defaultButtonText={`Biological Sex: ${userData.biological_sex}`}
      buttonTextAfterSelection={parseButtonText}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      dropdownStyle={styles.dropdownStyle}
      rowStyle={styles.rowStyle}
      rowTextStyle={styles.rowTextStyle}
      onSelect={handleChange}
      dropdownOverlayColor="transparent"
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 10,
    width: "100%",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },

  buttonTextStyle: {
    fontSize: 16,
    color: ColorPalette.dark.secondary200,
  },

  dropdownStyle: {
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 10,
    width: windowWidth * 0.9 - 35,
    alignItems: "center",
    justifyContent: "center",
  },

  rowStyle: {
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 10,
    width: windowWidth * 0.9 - 35,
    alignItems: "center",
    justifyContent: "center",
  },

  rowTextStyle: {
    fontSize: 16,
    color: ColorPalette.dark.secondary200,
  },
});
