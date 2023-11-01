import { FlatList, StyleSheet } from "react-native";
import ExerciseLetterGroup from "./ExerciseLetterGroup";

export default function ExerciseListMain({
  search,
  setSearch,
  exercises,
  filteredExercises,
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
          setSearch={setSearch}
          exerciseArr={
            (search.name === "" && search.category === ""
              ? exercises
              : filteredExercises)[item]
          }
          onPress={onPress}
        />
      )}
      keyExtractor={(item) => item}
    />
  );
}

const styles = StyleSheet.create({
  container: { height: "90%", width: "100%" },
});
