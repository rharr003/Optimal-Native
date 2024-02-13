import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import RNPickerSelect from "react-native-picker-select";
import {
  parseHeight,
  pickerStyle,
  heightOptions,
} from "../../../util/config/profile/heightPickerConfig";
const { width } = Dimensions.get("window");
export default function HeightSelector({ handleChange, userData }) {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={heightOptions}
        style={pickerStyle}
      >
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>{`Height: ${parseHeight(
            userData.height
          )}`}</Text>
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
    maxHeight: 200,
  },
  buttonStyle: {
    backgroundColor: ColorPalette.dark.gray800,
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
