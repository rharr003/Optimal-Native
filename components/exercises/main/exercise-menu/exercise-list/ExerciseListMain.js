import { FlatList, StyleSheet } from "react-native";
import ExerciseLetterGroup from "./ExerciseLetterGroup";

export default function ExerciseListMain({
  search,
  exercises,
  filteredExercises,
  uniqueSelected,
  selectedExercises,
  onPress,
}) {
  return (
    <FlatList
      style={styles.container}
      data={Object.keys(
        search.name === "" && search.category === ""
          ? exercises
          : filteredExercises
      )}
      renderItem={({ item }) => (
        <ExerciseLetterGroup
          letter={item}
          exerciseArr={
            (search.name === "" && search.category === ""
              ? exercises
              : filteredExercises)[item]
          }
          onPress={onPress}
          uniqueSelected={uniqueSelected}
          selectedExercises={selectedExercises}
        />
      )}
      keyExtractor={(item) => item}
    />
  );
}

const styles = StyleSheet.create({
  container: { height: "90%", width: "100%" },
});
