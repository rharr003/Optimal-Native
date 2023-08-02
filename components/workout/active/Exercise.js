import { View, StyleSheet, FlatList, AppState } from "react-native";
import { ColorPalette } from "../../ui/ColorPalette";
import WorkoutSetGestureContainer from "./ExerciseSetGestureContainer";
import CustomButton from "../../ui/CustomButton";
import { bulkUpdateSets } from "../../../util/workout";
import { useDispatch } from "react-redux";
import WorkoutExerciseTableHeader from "./ExerciseHeader";
import { useState, useEffect, useRef } from "react";

export default function WorkoutExercise({
  exercise,
  index,
  handleManageExerciseModalOpen,
}) {
  const dispatch = useDispatch();
  const [sets, setSets] = useState(exercise.sets);
  const [activeIdx, setActiveIdx] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const persistedSets = useRef(exercise.sets);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (newAppState) => {
      if (newAppState.match(/inactive|background/)) {
        dispatch(
          bulkUpdateSets({
            exerciseId: exercise.id,
            sets: persistedSets.current,
          })
        );
      }
      setAppState(newAppState);
    });
    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    return () => {
      console.log("unmounting");
      dispatch(
        bulkUpdateSets({ exerciseId: exercise.id, sets: persistedSets.current })
      );
    };
  }, []);

  useEffect(() => {
    persistedSets.current = sets;
  }, [sets]);

  function updateSet(text, index, field) {
    setSets((prevSets) => {
      return prevSets.map((set, setIndex) => {
        if (setIndex === index) {
          return {
            ...set,
            [field]: text,
          };
        }
        return set;
      });
    });
    persistedSets.current = sets;
  }

  function addSet() {
    const newSets = [...sets];
    newSets.push({
      weight: "",
      reps: "",
      prevReps: null,
      prevWeight: null,
      completed: false,
    });
    setSets(newSets);
    persistedSets.current = newSets;
  }

  function completeSet(index) {
    setSets((prevSets) => {
      const newSet = prevSets.map((set, setIndex) => {
        if (setIndex === index) {
          return {
            ...set,
            completed: !set.completed,
          };
        }
        return set;
      });
      persistedSets.current = newSet;
      return newSet;
    });
  }

  function removeSet(index) {
    setSets((prevSets) => {
      const newSets = prevSets.filter((set, setIndex) => {
        return setIndex !== index;
      });
      return newSets;
    });
  }

  return (
    <View style={[styles.exercise]}>
      <WorkoutExerciseTableHeader
        handleModalToggle={() => handleManageExerciseModalOpen(index, exercise)}
      />

      <FlatList
        data={sets}
        renderItem={({ item, index }) => (
          <WorkoutSetGestureContainer
            set={item}
            setNum={index + 1}
            restTime={exercise.restTime}
            exerciseId={exercise.id}
            key={exercise.id + index}
            setCompleted={item.completed}
            removeSet={removeSet}
            updateSet={updateSet}
            completeSet={completeSet}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
          />
        )}
        keyExtractor={(item, index) => exercise.id + index}
      />
      <CustomButton
        title="Add Set"
        onPress={addSet}
        iconName="add-outline"
        color={ColorPalette.dark.gray900}
        textColor={"#FFFFFF"}
        style={{ padding: 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  exercise: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: ColorPalette.dark.gray300,
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
});
