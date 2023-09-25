import RNPickerSelect from "react-native-picker-select";
import { ColorPalette } from "../../../../ColorPalette";
import { useState } from "react";
import { formatTime } from "../../../../util/formatTime";

import { View, Text, StyleSheet } from "react-native";

export default function RestTimePicker({ restTime, setRestTime, close }) {
  const [currSelection, setCurrSelection] = useState(restTime);
  const restTimeOptions = [];

  for (let i = 0; i < 601; i += 15) {
    restTimeOptions.push(i);
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setCurrSelection(value)}
        items={restTimeOptions.map((time) => ({
          label: formatTime(time),
          color: "#FFFFFF",
          value: time,
        }))}
        onClose={async () => await close(currSelection)}
        onDonePress={async () => await close(currSelection)}
        style={{
          modalViewBottom: {
            backgroundColor: ColorPalette.dark.gray500,
          },
          modalViewMiddle: {
            borderTopWidth: 0,
            backgroundColor: ColorPalette.dark.gray500,
          },
          done: {
            color: ColorPalette.dark.secondary200,
          },
          chevron: {
            display: "none",
          },
        }}
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
