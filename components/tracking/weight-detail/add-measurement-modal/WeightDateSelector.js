import { View, Text, StyleSheet, Pressable, Keyboard } from "react-native";
import { useState } from "react";
import { ColorPalette } from "../../../../ColorPalette";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function WeightDateSelector({ date, handleChange }) {
  const [showPicker, setShowPicker] = useState(false);

  function togglePicker() {
    Keyboard.dismiss();
    setShowPicker((prev) => !prev);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <Pressable
        onPress={togglePicker}
        style={({ pressed }) => [styles.buttonStyle, pressed && styles.pressed]}
      >
        <Ionicons
          name={"calendar-outline"}
          size={20}
          color={ColorPalette.dark.gray500}
        />
        <Text style={styles.buttonTextStyle}>
          {date.toLocaleString().split(",")[0]}
        </Text>
      </Pressable>
      <DatePicker
        date={new Date(date)}
        modal
        open={showPicker}
        onConfirm={handleChange}
        onCancel={togglePicker}
        mode="date"
        theme="dark"
        locale="en"
        timeZoneOffsetInMinutes={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "90%",
    marginVertical: 15,
  },
  pressed: {
    opacity: 0.8,
  },

  label: {
    fontSize: 18,
    color: ColorPalette.dark.secondary200,
    marginBottom: 5,
  },
  buttonStyle: {
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 5,
    width: "100%",
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 40,
    paddingHorizontal: 25,
  },

  buttonTextStyle: {
    marginLeft: 5,
    fontSize: 16,
    color: ColorPalette.dark.secondary200,
  },
});
