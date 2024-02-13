import { StyleSheet, View } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import RNPickerSelect from "react-native-picker-select";
import {
  pickerStyle,
  bodyPartOptions,
} from "../../../../../../util/config/exercises/BodyPartFilterPickerConfig";
import CustomButton from "../../../../../shared/ui/CustomButton";

export default function BodyPartFilter({ handleChange, search }) {
  function onValueChange(val) {
    if (!val) return;
    handleChange({ name: "", category: val });
  }
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={bodyPartOptions}
        style={pickerStyle}
        placeholder={{}}
        value={search.category}
      >
        <CustomButton
          title={search.category || "Any"}
          iconName="filter-outline"
          color={ColorPalette.dark.gray800}
          textColor="#FFFFFF"
          style={styles.buttonStyle}
        />
      </RNPickerSelect>
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
