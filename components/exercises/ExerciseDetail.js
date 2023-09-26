import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  getBestSets1RM,
  getBestSets1RMLast6Months,
  getBestSetsConsecutiveReps,
  getBestSetsConsecutiveRepsLast6Months,
  getBestSetsHoldTime,
  getBestSetsHoldTimeLast6Months,
  updateExercise,
  deleteExercise,
} from "../../util/sqlite/db";
import ExercisePerformance from "./ExercisePerformance";
import ExercisePerformanceHeader from "./ExercisePerformanceHeader";
import LineChart from "../shared/line-chart/LineChart";
import { createChartDataObjExercise } from "../../util/chart/createChartDataObjExercise";
import { ColorPalette } from "../../ColorPalette";
import ExerciseEditButton from "./ExerciseEditButton";
import ExerciseDeleteButton from "./ExerciseDeleteButton";
import AddOrEditExerciseModal from "../shared/modals/AddOrEditExerciseModal";
import DeleteModal from "./DeleteModal";

export default function ExerciseDetail({ route, navigation }) {
  const [performances, setPerformances] = useState([]);
  const [chartTitle, setChartTitle] = useState("1 Rep Max (lbs)");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [thirdColumnName, setThirdColumnName] = useState("Date");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
    legend: [],
  });
  const { exercise } = route.params;

  function openModal() {
    setShowModal(true);
  }

  function openDeleteModal() {
    setShowDeleteModal(true);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: exercise.name,
      headerRight: () => <ExerciseEditButton onPress={openModal} />,
      headerLeft: () => <ExerciseDeleteButton onPress={openDeleteModal} />,
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

  async function onCompleteModal(name, equipment, bodyPart) {
    const newExercise = await updateExercise(
      exercise.id,
      name,
      equipment.toLowerCase(),
      bodyPart
    );
    navigation.setOptions({
      headerTitle: newExercise.name,
    });
    setShowModal(false);
  }

  async function handleDeleteExercise() {
    await deleteExercise(exercise.id);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <AddOrEditExerciseModal
        showModal={showModal}
        setShowModal={setShowModal}
        onComplete={onCompleteModal}
        isEditing={true}
        exercise={exercise}
      />
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        exercise={exercise}
        onDelete={handleDeleteExercise}
      />
      <View style={styles.chartView}>
        <LineChart
          title={chartTitle}
          data={chartData}
          chartConfig={chartConfig}
          withFilterButton={false}
          emptyDataText="No Recent Data"
          hideHorizontalLabels={chartData.datasets.length > 0 ? false : true}
        />
      </View>
      <View style={styles.performanceView}>
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

  performanceView: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  chartView: {
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
});
