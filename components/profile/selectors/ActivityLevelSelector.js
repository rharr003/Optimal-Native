import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import RNPickerSelect from "react-native-picker-select";
import {
  pickerStyle,
  activityLevelOptions,
} from "../../../util/config/profile/activityLevelPickerConfig";
const { width } = Dimensions.get("window");
export default function ActivityLevelSelector({ handleChange, userData }) {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={activityLevelOptions}
        style={pickerStyle}
        useNativeAndroidPickerStyle={false}
      >
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            {userData && userData.activity_level !== "placeholder"
              ? `Activity Level: ${userData.activity_level}`
              : `Select Activity Level`}
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

  pressed: {
    opacity: 0.7,
  },
});
