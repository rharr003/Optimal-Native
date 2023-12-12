import CustomButton from "../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../ColorPalette";
import { StyleSheet, View, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkoutDuration } from "../../../../../util/redux/slices/workout";

export default function WorkoutFooterButtons({
  openAddExercise,
  cancelWorkout,
  openFinishModal,
}) {
  const timer = useSelector((state) => state.workout.timer);
  const dispatch = useDispatch();

  function androidFinish() {
    dispatch(updateWorkoutDuration({ duration: timer }));
    openFinishModal();
  }
  return (
    <View style={styles.footer}>
      <CustomButton
        title="Add Exercise"
        color={ColorPalette.dark.gray500}
        iconName={"add-outline"}
        onPress={openAddExercise}
        style={styles.buttonStyle}
        textColor="#FFFFFF"
      />
      <CustomButton
        title="Cancel Workout"
        color={ColorPalette.dark.error}
        iconName={"trash-outline"}
        onPress={cancelWorkout}
        style={styles.buttonStyle}
        textColor="#000000"
      />
      {Platform.OS === "android" && (
        <CustomButton
          title="Finish Workout"
          color={ColorPalette.dark.secondary200}
          iconName={"checkmark-outline"}
          onPress={androidFinish}
          style={styles.buttonStyle}
          textColor="#000000"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    marginVertical: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    width: "95%",
    paddingVertical: 5,
  },
});
