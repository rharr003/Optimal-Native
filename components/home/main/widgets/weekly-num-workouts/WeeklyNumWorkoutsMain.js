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
import { setNumWorkoutsLastSixWeeksData } from "../../../../../util/redux/widgets";

export default function WeeklyNumWorkoutsMain() {
  const numWorkouts = useSelector(
    (state) => state.widgets.numWorkoutsLastSixWeeksData
  );
  const dispatch = useDispatch();
  const max = Math.max(...numWorkouts.map((item) => item.total));
  const chartWidth = Dimensions.get("window").width - 20;

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
      <Text style={styles.title}>Workouts per week:</Text>
      <BarChart
        data={data}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        withInnerLines={false}
        style={{ marginLeft: -30 }}
        fromNumber={fromNumber}
        fromZero={true}
        showBarTops={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  chartContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 10,
    color: ColorPalette.dark.gray400,
  },

  text: {
    fontSize: 28,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
    marginVertical: 5,
  },
});
