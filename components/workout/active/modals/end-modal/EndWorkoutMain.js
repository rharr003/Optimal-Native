import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../../../shared/ui/CustomButton";
import { useSelector } from "react-redux";
import { ColorPalette } from "../../../../../ColorPalette";
import EmptyMenuMain from "./empty-menu/EmptyMenuMain";
import NewWorkoutMain from "./new-menu/NewWorkoutMenuMain";
import TemplateMenuMain from "./template-menu/TemplateMenuMain";

export default function EndWorkoutMain({ handleClose }) {
  const workout = useSelector((state) => state.workout.workout);
  const isTemplate = workout.isTemplate;
  const numSetsCompleted = workout.exercises.reduce(
    (acc, exercise) =>
      (acc += exercise.sets.filter((set) => set.completed).length),
    0
  );

  return (
    <View style={styles.centeredView}>
      <Text>{numSetsCompleted === 0 ? "Cancel Workout?" : "End Workout"}</Text>
      <Text style={styles.disclaimer}>Any incomplete sets will be lost</Text>
      {numSetsCompleted === 0 && <EmptyMenuMain />}
      {numSetsCompleted > 0 && !isTemplate && (
        <NewWorkoutMain workout={workout} />
      )}
      {numSetsCompleted > 0 && isTemplate && (
        <TemplateMenuMain workout={workout} />
      )}

      <CustomButton
        onPress={handleClose}
        title="Go Back"
        iconName="close-outline"
        style={styles.buttonStyle}
        color={ColorPalette.dark.gray500}
        textColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  disclaimer: {
    color: ColorPalette.dark.gray500,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 10,
  },

  buttonStyle: {
    margin: 0,
    paddingVertical: 3,
    width: "90%",
  },
});
