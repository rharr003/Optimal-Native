import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";

export default function Weight({ currWeight }) {
  const value = currWeight === 0 ? "No Data" : currWeight + " lbs";
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Weight:</Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 10,
    color: ColorPalette.dark.secondary200,
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
});
