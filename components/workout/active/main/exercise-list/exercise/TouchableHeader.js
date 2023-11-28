import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function TouchableHeader({
  name,
  drag,
  hapticDrag,
  isActive,
  equipment,
}) {
  function handleDrag() {
    hapticDrag(drag);
  }
  return (
    <TouchableOpacity onLongPress={handleDrag} disabled={isActive}>
      <Text style={styles.text}>
        {equipment !== "body" && equipment !== "static"
          ? `${name} (${equipment[0].toUpperCase() + equipment.slice(1)})`
          : name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: ColorPalette.dark.secondary200,
    fontSize: 21,
    textAlign: "left",
    marginLeft: 15,
    marginVertical: 10,
  },
});
