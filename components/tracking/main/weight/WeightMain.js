import { View, StyleSheet } from "react-native";
import Chart from "./chart/Chart";
import WeightHeader from "./header/WeightHeader";

export default function WeightMain() {
  return (
    <View style={styles.container}>
      <WeightHeader />
      <Chart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    width: "100%",
    marginBottom: 25,
    marginTop: 25,
  },
});
