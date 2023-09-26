import { Text, View, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";
import ChartFilter from "./ChartFilter";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  fetchRecentWeightDataWeeklyAvg,
  fetchRecentWeightDataDailyAvg,
  fetchRecentWeightDataMonthlyAvg,
} from "../../../../../util/sqlite/db";
import LineChart from "./LineChart";
import PressableOverlay from "../../../../shared/ui/PressableOverlay";

export default function ChartMain({}) {
  const [currFormat, setCurrFormat] = useState("weekly");
  const [metricData, setMetricData] = useState([]);
  const [indexesToHide, setIndexesToHide] = useState([]);
  const isFocused = useIsFocused();

  const withHorizontalLabels = metricData.length > 0 ? true : false;

  useEffect(() => {
    async function fetch() {
      if (isFocused) {
        let data;
        let hiddenIndexes;
        if (currFormat === "weekly") {
          [data, hiddenIndexes] = await fetchRecentWeightDataWeeklyAvg();
        } else if (currFormat === "monthly") {
          [data, hiddenIndexes] = await fetchRecentWeightDataMonthlyAvg();
        } else if (currFormat === "daily") {
          [data, hiddenIndexes] = await fetchRecentWeightDataDailyAvg();
        }
        setMetricData(data);
        setIndexesToHide(hiddenIndexes);
      }
    }
    if (isFocused) fetch();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <LineChart
        rawData={metricData}
        hiddenIndexes={indexesToHide}
        withHorizontalLabels={withHorizontalLabels}
      />

      {!metricData.length && (
        <PressableOverlay message={"No data for this period"} opacity={0.5} />
      )}
      <ChartFilter
        setCurrFormat={setCurrFormat}
        setIndexesToHide={setIndexesToHide}
        setMetricData={setMetricData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  chartOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",

    justifyContent: "center",
    backgroundColor: ColorPalette.dark.gray900,
    opacity: 0.7,
  },

  chartOverlayText: {
    color: ColorPalette.dark.secondary200,

    fontSize: 20,
  },
  italic: {
    fontStyle: "italic",

    color: ColorPalette.dark.gray500,
  },
});
