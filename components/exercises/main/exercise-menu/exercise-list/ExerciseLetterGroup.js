import { View, Text, StyleSheet } from "react-native";
import AddExerciseExerciseItem from "./ExerciseItem";
import React from "react";

function AddExerciseLetterGroup({ exerciseArr, letter, onPress, setSearch }) {
  return (
    <View>
      <Text style={styles.title}>{letter}</Text>
      {exerciseArr.map((exercise) => {
        return (
          <AddExerciseExerciseItem
            key={exercise.id}
            setSearch={setSearch}
            exercise={exercise}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    color: "#FFFFFF",
  },
});

export default React.memo(AddExerciseLetterGroup);
