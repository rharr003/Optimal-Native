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
  const numSetsNotCompleted = keys.reduce(
    (acc, key) =>
      (acc += workout.exerciseSets[key].filter((set) => !set.completed).length),
    0
  );
  const [workoutName, setWorkoutName] = useState(workout.name);
  function handleNameChange(text) {
    setWorkoutName(text);
  }

  return (
    <View style={styles.centeredView}>
      <Text style={[styles.title]}>
        {numSetsCompleted === 0 || cancelling
          ? "Cancel Workout?"
          : "End Workout?"}
      </Text>
      {numSetsCompleted > 0 && !cancelling && !isTemplate && (
        <FormInput
          placeholder={"Enter a name"}
          handleChange={handleNameChange}
          iconName={"reader-outline"}
          text={workoutName}
          keyboardType="default"
          style={{ marginBottom: 10 }}
        />
      )}
      {numSetsNotCompleted > 0 && (
        <Text style={styles.disclaimer}>
          {numSetsNotCompleted} incomplete{" "}
          {numSetsNotCompleted > 1 ? "sets" : "set"} will be lost
        </Text>
      )}
      <View style={styles.innerView}>
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

  innerView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    marginHorizontal: 0,
    marginTop: 0,
    paddingVertical: 5,
    width: "90%",
  },
});
