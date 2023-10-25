import { Pressable, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CustomButton({
  onPress,
  title,
  color,
  iconName,
  style = null,
  textColor = "#000000",
  size = 24,
  onLongPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed ? styles.pressed : null,
        style,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Ionicons name={iconName} size={size} color={textColor} />
      {title !== "" ? (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    marginLeft: 5,
  },
});
