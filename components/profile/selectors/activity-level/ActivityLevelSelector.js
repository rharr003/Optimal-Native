import { StyleSheet, View, Pressable, Text } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  pickerStyle,
  activityLevelOptions,
} from "../../../../util/config/profile/activityLevelPickerConfig";

export default function ActivityLevelSelector({ handleChange, userData }) {
  const [showPicker, setShowPicker] = useState(false);

  function togglePicker() {
    setShowPicker((prev) => !prev);
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={togglePicker} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
          {userData && userData.activity_level !== "placeholder"
            ? `Activity Level: ${userData.activity_level}`
            : `Select Activity Level`}
        </Text>
        {showPicker && (
          <RNPickerSelect
            onValueChange={handleChange}
            items={activityLevelOptions}
            onClose={togglePicker}
            onDonePress={togglePicker}
            style={pickerStyle}
          />
        )}
      </Pressable>
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
});
