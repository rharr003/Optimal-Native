import { ColorPalette } from "../../../ColorPalette";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import RNPickerSelect from "react-native-picker-select";

export default function PickerInput({
  value,
  iconName,
  handleChange,
  label,
  pickerOptions,
  pickerStyle,
  disabled = false,
  textColor = ColorPalette.dark.secondary200,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={handleChange}
        items={pickerOptions}
        style={pickerStyle}
        disabled={disabled}
      >
        <View style={styles.fakeInput}>
          <Ionicons
            name={iconName}
            size={20}
            color={ColorPalette.dark.gray500}
          />
          <Text style={[styles.text, { color: textColor }]}>{value}</Text>
        </View>
      </RNPickerSelect>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },

  pressed: {
    opacity: 0.8,
  },

  label: {
    fontSize: 18,
    color: ColorPalette.dark.secondary200,
    marginBottom: 5,
  },

  fakeInput: {
    width: "100%",
    backgroundColor: "#121212f5",
    borderRadius: 10,
    padding: 5,
    paddingLeft: 25,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    textAlign: "center",
  },
});
