import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  getBestSets1RM,
  getBestSets1RMLast6Months,
  getBestSetsConsecutiveReps,
  getBestSetsConsecutiveRepsLast6Months,
  getBestSetsHoldTime,
  getBestSetsHoldTimeLast6Months,
} from "../../util/sqlite/db";
import ExercisePerformance from "./ExercisePerformance";
import ExercisePerformanceHeader from "./ExercisePerformanceHeader";
import LineChart from "../ui/charts/line-chart/LineChart";
import { createChartDataObjExercise } from "../../util/chart/createChartDataObjExercise";
import { ColorPalette } from "../ui/ColorPalette";

export default function ExerciseDetail({ route, navigation }) {
  const [performances, setPerformances] = useState([]);
  const [chartTitle, setChartTitle] = useState("1 Rep Max (lbs)");
  const [thirdColumnName, setThirdColumnName] = useState("Date");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
    legend: [],
  });
  const { exercise } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: exercise.name,
    });
  }, []);

  useEffect(() => {
    // we adjust the fetch function so that the metrics we are fetching make sense for the type of exercise
    async function fetch() {
      if (exercise.equipment === "body") {
        const result = await getBestSetsConsecutiveReps(exercise.id);
        const newChartData = await getBestSetsConsecutiveRepsLast6Months(
          exercise.id
        );
        if (newChartData) {
          setChartData(createChartDataObjExercise(newChartData));
        }
        setPerformances(result);
        setChartTitle("Max Reps");
        return;
      } else if (exercise.equipment === "static") {
        setChartTitle("Max Hold Time (sec)");
        const result = await getBestSetsHoldTime(exercise.id);
        const newChartData = await getBestSetsHoldTimeLast6Months(exercise.id);
        if (newChartData) {
          setChartData(createChartDataObjExercise(newChartData));
        }
        setPerformances(result);
        return;
      }
      setThirdColumnName("1RM");
      const result = await getBestSets1RM(exercise.id);
      const newChartData = await getBestSets1RMLast6Months(exercise.id);
      if (newChartData) {
        setChartData(createChartDataObjExercise(newChartData));
      }

      setPerformances(result);
    }

    fetch();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#01ffe6",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#004b42",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => "#80fdf1",
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      fillOpacity: 0,
      strokeOpacity: 0.5,
    },
    decimalPlaces: 0,
  };

  return (
    <View style={styles.container}>
      <View
        style={{ height: 260, justifyContent: "center", alignItems: "center" }}
      >
        <LineChart
          title={chartTitle}
          data={chartData}
          chartConfig={chartConfig}
          withFilterButton={false}
          emptyDataText="No Recent Data"
          hideHorizontalLabels={chartData.datasets.length > 0 ? false : true}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Top Performances</Text>
        <ExercisePerformanceHeader thirdColumnName={thirdColumnName} />
        <FlatList
          data={performances}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={<View style={{ height: 40 }} />}
          renderItem={({ item, index }) => {
            return (
              <ExercisePerformance
                performance={item}
                index={index}
                equipment={exercise.equipment}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorPalette.dark.gray300,
    marginBottom: 10,
  },
});
