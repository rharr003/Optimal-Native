import { Pressable, View, Text, StyleSheet, Dimensions } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";

const width = Dimensions.get("window").width;

export default function Overlay({ overlayMessage, handlePress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.overlay, pressed && styles.pressed]}
      onPress={handlePress}
    >
      <View style={styles.overlayTextView}>
        <Text style={[styles.text, styles.italic]}>{overlayMessage}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: ColorPalette.dark.gray900,
    opacity: 0.9,
  },

  overlayTextView: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  italic: {
    fontStyle: "italic",
    opacity: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: ColorPalette.dark.gray400,
    opacity: 0.7,
  },

  text: {
    fontSize: 14,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
    marginVertical: 5,
  },

  pressed: {
    backgroundColor: ColorPalette.dark.gray800,
  },
});
