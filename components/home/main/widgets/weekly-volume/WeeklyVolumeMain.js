import { View, Text, StyleSheet, Dimensions } from "react-native";
import { getWeeklyVolumePastSixWeeks } from "../../../../../util/sqlite/db";
import { useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import { ColorPalette } from "../../../../../ColorPalette";
import {
  chartConfig,
  buildChartDataObj,
} from "../../../../../util/chart/home/weeklyVolume";
import { useDispatch, useSelector } from "react-redux";
import { setWeeklyVolumeLastSixWeeksData } from "../../../../../util/redux/slices/widgets";

export default function WeeklyVolumeMain() {
  const weeklyVolume = useSelector(
    (state) => state.widgets.weeklyVolumeLastSixWeeksData
  );
  const max = Math.max(...weeklyVolume.map((item) => item.totalVolume));
  const chartWidth = Dimensions.get("window").width * 0.95;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const result = await getWeeklyVolumePastSixWeeks();
      dispatch(setWeeklyVolumeLastSixWeeksData(result));
    }
    fetch();
  }, []);

  const data = buildChartDataObj(weeklyVolume);
  const fromNumber = max > 50000 ? max : 50000;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Volume (Lbs):</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
          fromNumber={fromNumber}
          fromZero={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    borderColor: ColorPalette.dark.secondary200,
    borderWidth: 1,
    borderRadius: 25,
  },

  chartContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: ColorPalette.dark.secondary200,
  },
});
