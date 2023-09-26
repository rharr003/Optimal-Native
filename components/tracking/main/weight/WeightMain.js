import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";
import {
  fetchRecentWeightDataWeeklyAvg,
  fetchRecentWeightDataDailyAvg,
  fetchRecentWeightDataMonthlyAvg,
} from "../../../../util/sqlite/db";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import ChartMain from "./chart/ChartMain";
import CurrentWeight from "./current-weight/CurrentWeight";

export default function WeightMain() {
  const [currFormat, setCurrFormat] = useState("weekly");
  const [metricMeasurements, setMetricMeasurements] = useState([]);
  const [indexesToHideState, setIndexesToHideState] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetch() {
      if (isFocused) {
        let data;
        let indexesToHide;
        if (currFormat === "weekly") {
          [data, indexesToHide] = await fetchRecentWeightDataWeeklyAvg();
        } else if (currFormat === "monthly") {
          [data, indexesToHide] = await fetchRecentWeightDataMonthlyAvg();
        } else if (currFormat === "daily") {
          [data, indexesToHide] = await fetchRecentWeightDataDailyAvg();
        }
        setMetricMeasurements(data);
        setIndexesToHideState(indexesToHide);
      }
    }
    if (isFocused) fetch();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Report</Text>
      <CurrentWeight />
      <ChartMain
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
