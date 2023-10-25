import { formatTime } from "../../../../util/formatTime";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";

export default function RestTimerCenter({ time, increase, decrease }) {
  return (
    <View style={styles.container}>
      {/* <CustomButton
        title={""}
        onPress={decrease}
        iconName={"remove-circle-outline"}
        textColor={ColorPalette.dark.secondary200}
        size={40}
        style={styles.button}
      /> */}
      {/* <View style={styles.textContainer}> */}
      <Text style={styles.text}>{formatTime(time)}</Text>
      {/* </View> */}
      {/* <CustomButton
        title={""}
        onPress={increase}
        iconName={"add-circle-outline"}
        textColor={ColorPalette.dark.secondary200}
        size={40}
        style={styles.button}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textContainer: {
    width: "45%",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 44,
    textAlign: "center",
  },

  button: {
    margin: 0,
  },
});
