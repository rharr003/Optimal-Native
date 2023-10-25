import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useEffect } from "react";
import { fetchNumWorkoutsLastSixWeeks } from "../../../../../util/sqlite/db";
import { BarChart } from "react-native-chart-kit";
import { ColorPalette } from "../../../../../ColorPalette";
import {
  chartConfig,
  buildChartDataObj,
} from "../../../../../util/chart/home/weeklyNumWorkouts";
import { useDispatch, useSelector } from "react-redux";
import { setNumWorkoutsLastSixWeeksData } from "../../../../../util/redux/slices/widgets";

export default function WeeklyNumWorkoutsMain() {
  const numWorkouts = useSelector(
    (state) => state.widgets.numWorkoutsLastSixWeeksData
  );
  const dispatch = useDispatch();
  const max = Math.max(...numWorkouts.map((item) => item.total));
  const chartWidth = Dimensions.get("window").width * 0.95;

  useEffect(() => {
    async function fetch() {
      const result = await fetchNumWorkoutsLastSixWeeks();
      dispatch(setNumWorkoutsLastSixWeeksData(result));
    }

    fetch();
  }, []);

  const data = buildChartDataObj(numWorkouts);
  const fromNumber = max > 5 ? max : 5;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts Per Week:</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
          fromNumber={fromNumber}
          fromZero={true}
          showBarTops={true}
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
