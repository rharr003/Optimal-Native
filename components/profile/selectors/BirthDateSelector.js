import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Platform,
  Dimensions,
} from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import { useState } from "react";
import DatePicker from "react-native-date-picker";

const { width } = Dimensions.get("window");

export default function BirthDateSelector({ handleChange, userData }) {
  const [showPicker, setShowPicker] = useState(false);

  function togglePicker() {
    setShowPicker((prev) => !prev);
  }

  const birthDate = userData.birth_date
    ? new Date(userData.birth_date).toLocaleDateString("en-US", {
        timeZone: "UTC",
      })
    : "Tap to set";

  console.log(userData?.birth_date);

  return (
    <View style={styles.container}>
      <Pressable onPress={togglePicker} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
          {`Date of Birth: ${birthDate}`}
        </Text>
        <DatePicker
          date={
            userData?.birth_date
              ? new Date(userData.birth_date)
              : new Date(Date.now())
          }
          modal
          open={showPicker}
          onConfirm={handleChange}
          onCancel={togglePicker}
          mode="date"
          theme={Platform.OS === "ios" ? "dark" : "light"}
          locale="en"
          timeZoneOffsetInMinutes={0}
        />
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
    backgroundColor: ColorPalette.dark.gray800,
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
});
