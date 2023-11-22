import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../../../shared/ui/CustomButton";
import { useSelector } from "react-redux";
import { ColorPalette } from "../../../../../ColorPalette";
import EmptyMenuMain from "./empty-menu/EmptyMenuMain";
import NewWorkoutMain from "./new-menu/NewWorkoutMenuMain";
import TemplateMenuMain from "./template-menu/TemplateMenuMain";
import FormInput from "../../../../shared/ui/FormInput";
import { useState } from "react";

export default function EndWorkoutMain({ handleClose, cancelling }) {
  const workout = useSelector((state) => state.workout.workout);
  const isTemplate = workout.isTemplate;
  const keys = Object.keys(workout.exerciseSets);
  const numSetsCompleted = keys.reduce(
    (acc, key) =>
      (acc += workout.exerciseSets[key].filter((set) => set.completed).length),
    0
  );
  const [workoutName, setWorkoutName] = useState(workout.name);
  function handleNameChange(text) {
    setWorkoutName(text);
  }

  return (
    <View style={styles.centeredView}>
      {numSetsCompleted > 0 && !cancelling && (
        <FormInput
          placeholder={"Enter a name"}
          handleChange={handleNameChange}
          iconName={"reader-outline"}
          text={workoutName}
          keyboardType="default"
          label="Workout Name"
          style={{ marginBottom: 10 }}
        />
      )}
      <Text style={[styles.title]}>
        {numSetsCompleted === 0 || cancelling
          ? "Cancel Workout?"
          : "End Workout?"}
      </Text>
      <Text style={styles.disclaimer}>Any incomplete sets will be lost</Text>
      {(numSetsCompleted === 0 || cancelling) && <EmptyMenuMain />}
      {numSetsCompleted > 0 && !cancelling && !isTemplate && (
        <NewWorkoutMain workout={workout} name={workoutName} />
      )}
      {numSetsCompleted > 0 && isTemplate && !cancelling && (
        <TemplateMenuMain workout={workout} name={workoutName} />
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
    paddingVertical: 10,
  },

  title: {
    fontSize: 28,
    color: "#FFFFFF",
    textAlign: "center",
  },

  disclaimer: {
    color: ColorPalette.dark.error,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
    marginBottom: 25,
    fontSize: 18,
  },

  buttonStyle: {
    margin: 0,
    paddingVertical: 3,
    width: "90%",
  },
});
