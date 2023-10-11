import { StyleSheet, View, Pressable, Text } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  pickerStyle,
  bodyPartOptions,
} from "../../../../../../util/config/exercises/BodyPartPickerConfig";
import CustomButton from "../../../../../shared/ui/CustomButton";

export default function BodyPartFilter({ handleChange, search }) {
  const [showPicker, setShowPicker] = useState(false);

  function togglePicker() {
    setShowPicker((prev) => !prev);
  }

  function onValueChange(val) {
    if (!val) return;
    handleChange({ ...search, category: val });
  }
  return (
    <View style={styles.container}>
      <CustomButton
        title={search.category || "Any"}
        iconName="filter-outline"
        color={ColorPalette.dark.gray900}
        textColor="#FFFFFF"
        style={styles.buttonStyle}
        onPress={togglePicker}
      />
      {showPicker && (
        <RNPickerSelect
          onValueChange={onValueChange}
          items={bodyPartOptions}
          onClose={togglePicker}
          onDonePress={togglePicker}
          style={pickerStyle}
          placeholder={{}}
          value={search.category}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
  },
  buttonStyle: {
    width: "100%",
    padding: 5,
    height: 35,
    justifyContent: "space-between",
    paddingHorizontal: "21%",
    margin: 0,
  },
});
