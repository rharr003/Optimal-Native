import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { ColorPalette } from "../ui/ColorPalette";

export default function AddWidgetModalItem({
  widgetName,
  onSelect,
  shouldDisplay,
  widgetDescription,
}) {
  const [selected, setSelected] = useState(shouldDisplay);

  function onPress() {
    setSelected(!selected);
    onSelect();
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{widgetName}</Text>
      <Text style={styles.descriptionText}>{widgetDescription}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.dark.gray700,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  descriptionText: {
    fontSize: 12,
    color: "#fff",
    fontStyle: "italic",
  },

  pressed: {
    opacity: 0.75,
  },

  selected: {
    opacity: 1,
    backgroundColor: ColorPalette.dark.secondary700,
  },
});
