import { View, StyleSheet, Platform } from "react-native";
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
  fetchTemplates,
  fetchTemplateExercises,
} from "../../../util/sqlite/db";
import { createChartDataObjExercise } from "../../../util/chart/createChartDataObjExercise";
import ExerciseEditButton from "./edit-delete/ExerciseEditButton";
import ExerciseDeleteButton from "./edit-delete/ExerciseDeleteButton";
import AddOrEditExerciseModalMain from "../../shared/modals/add-or-edit-exercise/AddOrEditExerciseModalMain";
import DeleteModal from "./DeleteModal";
import { useDispatch } from "react-redux";
import {
  deleteExercise as deleteExerciseRedux,
  updateExercise as updateExerciseRedux,
} from "../../../util/redux/slices/exercises";
import PerformancesMain from "./performances/PerformancesMain";
import { populateTemplates } from "../../../util/redux/slices/templates";

export default function ExerciseDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const [performances, setPerformances] = useState([]);
  const [chartTitle, setChartTitle] = useState("1 Rep Max (lbs)");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [thirdColumnName, setThirdColumnName] = useState("Date");
  // need to format the initial empty state to avoid errors on intitial render
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
    if (Platform.OS === "ios") {
      navigation.setOptions({
        headerTitle: exercise.name,
        headerRight: () => <ExerciseEditButton onPress={openModal} />,
        headerLeft: () => <ExerciseDeleteButton onPress={openDeleteModal} />,
      });
    }
  }, []);

  useEffect(() => {
    // we adjust the fetch function so that the metrics we are fetching make sense for the type of exercise
    async function fetch() {
      let chartData = null;
      if (exercise.equipment === "body") {
        const result = await getBestSetsConsecutiveReps(exercise.id);
        chartData = await getBestSetsConsecutiveRepsLast6Months(exercise.id);
        setPerformances(result);
        setChartTitle("Max Reps");
      } else if (exercise.equipment === "static") {
        setChartTitle("Max Hold Time (sec)");
        const result = await getBestSetsHoldTime(exercise.id);
        chartData = await getBestSetsHoldTimeLast6Months(exercise.id);
        setPerformances(result);
      } else {
        setThirdColumnName("1RM");
        const result = await getBestSets1RM(exercise.id);
        chartData = await getBestSets1RMLast6Months(exercise.id);

        setPerformances(result);
      }
      setChartData(createChartDataObjExercise(chartData));
    }
    try {
      fetch();
    } catch (e) {
      console.log(e);
    }
  }, []);

  async function onUpdateExercise(name, equipment, bodyPart) {
    try {
      const oldLetter = exercise.name[0].toUpperCase();
      const letter = name[0].toUpperCase();
      await updateExercise(
        exercise.id,
        name,
        equipment.toLowerCase(),
        bodyPart
      );
      dispatch(
        updateExerciseRedux({
          oldLetter,
          letterGroup: letter,
          exercise: {
            name,
            equipment: equipment.toLowerCase(),
            muscleGroup: bodyPart,
            id: exercise.id,
          },
          id: exercise.id,
        })
      );
      if (Platform.OS === "android") {
        navigation.goBack();
      }
      navigation.setOptions({
        headerTitle: name,
      });
    } catch (e) {
      console.log(e);
    }
    setShowModal(false);
  }

  async function handleDeleteExercise() {
    try {
      const letterGroup = exercise.name[0].toUpperCase();
      await deleteExercise(exercise.id);
      dispatch(deleteExerciseRedux({ id: exercise.id, letterGroup }));
      const templatesToFetch = await fetchTemplates();
      const promises = [];
      templatesToFetch.forEach((template) => {
        promises.push(
          fetchTemplateExercises(
            template.name,
            template.workout_id,
            template.date
          )
        );
      });
      const fetchedTemplates = await Promise.all(promises);
      dispatch(
        populateTemplates(
          fetchedTemplates.filter((template) => template !== null)
        )
      );
    } catch (e) {
      console.log(e);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <View style={styles.innerContainer}>
          <ExerciseEditButton onPress={openModal} />
          <ExerciseDeleteButton onPress={openDeleteModal} />
        </View>
      )}

      <AddOrEditExerciseModalMain
        showModal={showModal}
        setShowModal={setShowModal}
        onComplete={onUpdateExercise}
        isEditing={true}
        exercise={exercise}
      />
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        exercise={exercise}
        onDelete={handleDeleteExercise}
      />
      <PerformancesMain
        title={chartTitle}
        chartData={chartData}
        performanceListData={performances}
        equipment={exercise.equipment}
        thirdColumnName={thirdColumnName}
      />
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

  innerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 25,
    paddingHorizontal: 15,
  },
});
