import RNPickerSelect from "react-native-picker-select";
import {
  pickerStyle,
  restTimeOptions,
} from "../../../../../../../util/config/workout/restTimePickerConfig";
import Item from "../manage-modal-items/Item";
import { formatTime } from "../../../../../../../util/formatTime";
import { ColorPalette } from "../../../../../../../ColorPalette";
import { View, StyleSheet } from "react-native";

export default function RestTimePicker({ restTime, handleChange }) {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={restTimeOptions}
        style={pickerStyle}
        placeholder={{}}
        value={restTime}
      >
        <Item
          title="Edit Rest Time"
          icon={"time-outline"}
          iconColor={ColorPalette.dark.secondary200}
          rightText={formatTime(restTime)}
        />
      </RNPickerSelect>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
