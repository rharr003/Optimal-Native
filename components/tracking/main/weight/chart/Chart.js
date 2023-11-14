import { View, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  fetchRecentWeightDataWeeklyAvg,
  fetchRecentWeightDataDailyAvg,
  fetchRecentWeightDataMonthlyAvg,
} from "../../../../../util/sqlite/db";
import LineChart from "../../../../shared/line-chart/LineChart";
import {
  createChartDataObj,
  chartConfig,
} from "../../../../../util/chart/tracking/formatWeightData";

export default function Chart() {
  const [currFormat, setCurrFormat] = useState("weekly");
  const [metricData, setMetricData] = useState([]);
  const [indexesToHide, setIndexesToHide] = useState([]);
  const isFocused = useIsFocused();
  const data = createChartDataObj(metricData);

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
    if (isFocused) {
      try {
        fetch();
      } catch (e) {
        console.log(e);
      }
    }
  }, [isFocused, currFormat]);

  function handleFilterChange(newFormat) {
    setCurrFormat(newFormat.split(" ")[0].toLowerCase());
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        chartConfig={chartConfig}
        hiddenIndexes={indexesToHide}
        filterOptions={["Weekly Average", "Monthly Average", "Daily Average"]}
        onFilterChange={handleFilterChange}
        currFormat={currFormat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
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
