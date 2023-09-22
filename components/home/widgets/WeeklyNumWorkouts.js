import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchNumWorkoutsLastSixWeeks } from "../../../util/sqlite/db";
import { BarChart } from "react-native-chart-kit";
import { ColorPalette } from "../../ui/ColorPalette";

export default function WeeklyNumWorkouts() {
  const [numWorkouts, setNumWorkouts] = useState([{ total: 0, label: "" }]);
  const max = Math.max(...numWorkouts.map((item) => item.total));
  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetch() {
      const result = await fetchNumWorkoutsLastSixWeeks();
      setNumWorkouts(result);
    }

    if (isFocused) fetch();
  }, [isFocused]);

  const data = {
    labels: numWorkouts.map((item) => item.label),
    datasets: [
      {
        data: numWorkouts.map((item) => item.total),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#01ffe6",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#004b42",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => "#80fdf1",
    strokeWidth: 2,
    barPercentage: 1,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      fillOpacity: 0,
      strokeOpacity: 0.7,
    },
    decimalPlaces: 0,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts per week:</Text>
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={chartConfig}
        withInnerLines={false}
        style={{ marginLeft: -30 }}
        fromNumber={max > 5 ? max : 5}
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
