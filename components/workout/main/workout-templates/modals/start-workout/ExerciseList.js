import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function ExerciseList({ exercises, exerciseSets }) {
  return (
    <View>
      {exercises.map((exercise, index) => (
        <Text style={styles.text} key={Math.random()}>
          {index === 5 && exercises.length > 5
            ? `${
                exercise.name +
                ` (${
                  exercise.equipment[0].toUpperCase() +
                  exercise.equipment.slice(1)
                })` +
                " x " +
                exerciseSets[exercise.reactId].length
              } + ${workout.exercises.length - 5} more`
            : `${
                exercise.name +
                ` (${
                  exercise.equipment[0].toUpperCase() +
                  exercise.equipment.slice(1)
                })` +
                " x " +
                exerciseSets[exercise.reactId].length
              }`}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: ColorPalette.dark.gray400,
    marginVertical: 5,
  },
});
