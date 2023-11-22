import { formatTime } from "../../../../util/formatTime";
import { View, Text, StyleSheet } from "react-native";

export default function RestTimerCenter({ time }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(time)}</Text>
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
