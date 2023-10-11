import { Pressable, View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Item({
  title,
  onPress,
  rightText,
  icon,
  iconColor = "#FFFFFF",
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} size={24} color={iconColor} />
        <Text style={[styles.text, { marginLeft: 10 }]}>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rightText ? (
          <>
            <Text style={[styles.text, { color: iconColor }]}>{rightText}</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={iconColor}
            />
          </>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },

  pressed: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
