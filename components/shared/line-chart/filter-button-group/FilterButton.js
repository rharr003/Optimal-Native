import { Pressable, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";

export default function FilterButton({ text, onPress, isSelected }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isSelected && styles.selected]}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
    borderRadius: 10,
    width: 50,
    alignItems: "center",
  },

  text: {
    color: ColorPalette.dark.secondary200,
  },

  selected: {
    backgroundColor: ColorPalette.dark.secondary200,
  },

  selectedText: { color: ColorPalette.dark.gray900 },
});
