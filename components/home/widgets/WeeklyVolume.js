import { View, Text, StyleSheet, Dimensions } from "react-native";
import { getWeeklyVolumePastSixWeeks } from "../../../util/sqlite/db";
import { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { ColorPalette } from "../../ui/ColorPalette";
import { useIsFocused } from "@react-navigation/native";

export default function WeeklyVolume() {
  const [weeklyVolume, setWeeklyVolume] = useState([]);
  const isEmpty = weeklyVolume.every((item) => item.totalVolume === 0);
  const max = Math.max(...weeklyVolume.map((item) => item.totalVolume));
  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetch() {
      const result = await getWeeklyVolumePastSixWeeks();
      setWeeklyVolume(result);
    }
    if (isFocused) fetch();
  }, [isFocused]);

  const data = {
    labels: weeklyVolume.map((item) => item.label),
    datasets: [
      {
        data: weeklyVolume.map((item) => item.totalVolume),
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
      <Text style={styles.title}>Weekly Volume (lbs):</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 20}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
          withHorizontalLabels={!isEmpty}
          withVerticalLabels={!isEmpty}
          style={{ marginLeft: -30 }}
          fromNumber={max > 5000 ? max : 5000}
          fromZero={true}
        />
      </View>
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
