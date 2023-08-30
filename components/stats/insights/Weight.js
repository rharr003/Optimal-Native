import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../ui/ColorPalette";
import { fetchRecentWeightDataWeeklyAvg } from "../../../util/sqlite/db";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Chart from "../detail/Chart";
import WeightFooter from "./WeightFooter";

export default function Weight() {
  const [currFormat, setCurrFormat] = useState("weekly");
  const [metricMeasurements, setMetricMeasurements] = useState([]);
  const [indexesToHideState, setIndexesToHideState] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetch() {
      if (isFocused) {
        const [data, indexesToHide] = await fetchRecentWeightDataWeeklyAvg();
        setMetricMeasurements(data);
        setIndexesToHideState(indexesToHide);
        setCurrFormat("weekly");
      }
    }
    fetch();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Report</Text>
      <WeightFooter />
      <Chart
        metricData={metricMeasurements}
        hiddenIndexes={indexesToHideState}
        setIndexesToHide={setIndexesToHideState}
        setMetricData={setMetricMeasurements}
        setCurrFormat={setCurrFormat}
      />
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
