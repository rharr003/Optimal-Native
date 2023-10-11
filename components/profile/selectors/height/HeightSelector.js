import { StyleSheet, Pressable, Text, View } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  parseHeight,
  pickerStyle,
  heightOptions,
} from "../../../../util/config/profile/heightPickerConfig";

export default function HeightSelector({ handleChange, userData }) {
  const [showPicker, setShowPicker] = useState(false);

  function togglePicker() {
    setShowPicker((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={togglePicker} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>{`Height: ${parseHeight(
          userData.height
        )}`}</Text>
        {showPicker && (
          <RNPickerSelect
            onValueChange={handleChange}
            items={heightOptions}
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
