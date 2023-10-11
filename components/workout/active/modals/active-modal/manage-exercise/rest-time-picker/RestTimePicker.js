import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  pickerStyle,
  restTimeOptions,
} from "../../../../../../../util/config/workout/restTimePickerConfig";

export default function RestTimePicker({ restTime, close }) {
  const [currSelection, setCurrSelection] = useState(restTime);

  function handleChange(value) {
    setCurrSelection(value);
  }

  function handleClose() {
    close(currSelection);
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={restTimeOptions}
        onClose={handleClose}
        onDonePress={handleClose}
        style={pickerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
});
