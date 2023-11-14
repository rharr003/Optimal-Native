import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import RNPickerSelect from "react-native-picker-select";
import {
  genderOptions,
  pickerStyle,
} from "../../../util/config/profile/genderSelectorPickerConfig";

const { width } = Dimensions.get("window");

export default function GenderSelector({ handleChange, userData }) {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={genderOptions}
        style={pickerStyle}
      >
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            {`Biological Sex: ${userData.biological_sex}`}
          </Text>
        </View>
      </RNPickerSelect>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginVertical: 15,
  },
  buttonStyle: {
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 10,
    width: Platform.OS === "ios" ? "100%" : width * 0.85,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },

  buttonTextStyle: {
    fontSize: 16,
    color: ColorPalette.dark.secondary200,
  },
});
