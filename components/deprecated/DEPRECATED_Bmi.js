import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../ui/ColorPalette";

export default function Bmi() {
  return (
    <View style={styles.container}>
      <Text>bmi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorPalette.dark.secondary200,
    borderRadius: 10,
    height: 65,

    width: "100%",
  },
});
