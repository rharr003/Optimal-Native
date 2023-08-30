import { StyleSheet, Dimensions } from "react-native";
import { ColorPalette } from "../ui/ColorPalette";
import SelectDropdown from "react-native-select-dropdown";

const windowWidth = Dimensions.get("window").width;

export default function ActivityLevelSelector({ handleChange, userData }) {
  function parseButtonText(selectedItem) {
    switch (selectedItem) {
      case "Little to no exercise":
        return "Activity Level: Sedentary";
      case "Light exercise 1-3 days/week":
        return "Activity Level: Light";
      case "Moderate exercise 3-5 days/week":
        return "Activity Level: Moderate";
      case "Hard exercise 6-7 days/week":
        return "Activity Level: Heavy";
    }
  }
  return (
    <SelectDropdown
      data={[
        "Little to no exercise",
        "Light exercise 1-3 days/week",
        "Moderate exercise 3-5 days/week",
        "Hard exercise 6-7 days/week",
      ]}
      defaultButtonText={
        userData && userData.activity_level !== "placeholder"
          ? `Activity Level: ${userData.activity_level}`
          : `Select Activity Level`
      }
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
