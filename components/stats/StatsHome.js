import { View, Text, StyleSheet } from "react-native";
import InsightsMain from "./insights/InsightsMain";

export default function StatsHome() {
  return (
    <View style={styles.container}>
      <InsightsMain />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
