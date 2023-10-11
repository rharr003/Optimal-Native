import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function TouchableHeader({ name, drag, hapticDrag, isActive }) {
  function handleDrag() {
    hapticDrag(drag);
  }
  return (
    <TouchableOpacity onLongPress={handleDrag} disabled={isActive}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: ColorPalette.dark.secondary200,
    fontSize: 26,
    textAlign: "center",
  },
});
