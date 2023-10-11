import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";
import Chart from "./chart/Chart";
import CurrentWeight from "./current-weight/CurrentWeight";

export default function WeightMain() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Report</Text>
      <CurrentWeight />
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
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: ColorPalette.dark.gray400,
  },

  text: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 3,
  },

  losingWeight: {
    color: ColorPalette.dark.error,
  },

  gainingWeight: {
    color: ColorPalette.dark.primary200,
  },

  italic: {
    fontStyle: "italic",
    color: "black",
    opacity: 0.6,
  },

  bold: {
    fontWeight: "bold",
  },
});
