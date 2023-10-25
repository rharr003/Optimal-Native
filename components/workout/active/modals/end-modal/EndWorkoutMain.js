import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../../../shared/ui/CustomButton";
import { useSelector } from "react-redux";
import { ColorPalette } from "../../../../../ColorPalette";
import EmptyMenuMain from "./empty-menu/EmptyMenuMain";
import NewWorkoutMain from "./new-menu/NewWorkoutMenuMain";
import TemplateMenuMain from "./template-menu/TemplateMenuMain";

export default function EndWorkoutMain({ handleClose, cancelling }) {
  const workout = useSelector((state) => state.workout.workout);
  const isTemplate = workout.isTemplate;
  const numSetsCompleted = workout.exercises.reduce(
    (acc, exercise) =>
      (acc += exercise.sets.filter((set) => set.completed).length),
    0
  );

  return (
    <View style={styles.centeredView}>
      <Text
        style={[
          styles.title,
          (numSetsCompleted === 0 || cancelling) && {
            color: ColorPalette.dark.error,
          },
        ]}
      >
        {numSetsCompleted === 0 || cancelling
          ? "Cancel Workout?"
          : "End Workout?"}
      </Text>
      <Text style={styles.disclaimer}>Any incomplete sets will be lost</Text>
      {(numSetsCompleted === 0 || cancelling) && <EmptyMenuMain />}
      {numSetsCompleted > 0 && !cancelling && !isTemplate && (
        <NewWorkoutMain workout={workout} />
      )}
      {numSetsCompleted > 0 && isTemplate && !cancelling && (
        <TemplateMenuMain workout={workout} />
      )}

      <CustomButton
        onPress={handleClose}
        title="Go Back"
        iconName="log-out-outline"
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

  title: {
    fontSize: 28,
    color: ColorPalette.dark.secondary200,
    marginBottom: 10,
    textAlign: "center",
  },

  disclaimer: {
    color: ColorPalette.dark.gray500,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 10,
    fontSize: 18,
  },

  buttonStyle: {
    margin: 0,
    paddingVertical: 3,
    width: "90%",
  },
});
