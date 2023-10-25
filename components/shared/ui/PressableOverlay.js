import { View, Text, StyleSheet, Pressable } from "react-native";
import { ColorPalette } from "../../../ColorPalette";

export default function PressableOverlay({
  message,
  onPress = () => {
    return;
  },
  zIndex = 0,
  opacity = 0.9,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        { zIndex, opacity },
      ]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 25,
  },

  text: {
    color: ColorPalette.dark.secondary200,
    fontStyle: "italic",
    opacity: 1,
    fontSize: 22,
    fontWeight: "bold",
    opacity: 0.7,
  },

  pressed: {
    backgroundColor: ColorPalette.dark.gray800,
  },
});
