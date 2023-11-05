import { Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { ColorPalette } from "../../../ColorPalette";
import { useDispatch } from "react-redux";
import { toggleWidgetVisible } from "../../../util/redux/slices/widgets";
import { updateWidget } from "../../../util/sqlite/db";

export default function AddWidgetModalItem({ widget }) {
  const [selected, setSelected] = useState(widget.shouldDisplay);
  const dispatch = useDispatch();

  async function onPress() {
    setSelected(!selected);
    await updateWidget(widget.id, !widget.shouldDisplay);
    dispatch(toggleWidgetVisible({ id: widget.id }));
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
      <Text style={styles.text}>{widget.displayName}</Text>
      <Text style={styles.descriptionText}>{widget.description}</Text>
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
