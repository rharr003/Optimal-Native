import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../../ui/CustomButton";
import { useSelector } from "react-redux";
import { ColorPalette } from "../../../ui/ColorPalette";
import CancelButton from "./CancelButton";
import NewWorkoutButtons from "./NewWorkoutButtons";
import TemplateButtons from "./TemplateButtons";

export default function EndWorkoutMainMenu({ handleClose }) {
  const workout = useSelector((state) => state.workout.workout);
  const isTemplate = workout.isTemplate;
  const numSetsCompleted = workout.exercises.reduce(
    (acc, exercise) =>
      (acc += exercise.sets.filter((set) => set.completed).length),
    0
  );

  function handleGoBack() {
    handleClose();
  }

  return (
    <View style={styles.centeredView}>
      <Text>{numSetsCompleted === 0 ? "Cancel Workout?" : "End Workout"}</Text>
      <Text
        style={{
          color: ColorPalette.dark.gray500,
          fontStyle: "italic",
          textAlign: "center",
          marginBottom: 25,
          marginTop: 10,
        }}
      >
        Any incomplete sets will be lost
      </Text>
      {numSetsCompleted === 0 && <CancelButton />}
      {numSetsCompleted > 0 && !isTemplate && (
        <NewWorkoutButtons workout={workout} />
      )}
      {numSetsCompleted > 0 && isTemplate && (
        <TemplateButtons workout={workout} />
      )}

      <CustomButton
        onPress={handleGoBack}
        title="Go Back"
        iconName="close-outline"
        style={{
          margin: 0,
          paddingVertical: 3,
          width: "90%",
        }}
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
});
