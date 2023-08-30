import CustomButton from "../../ui/CustomButton";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateWorkoutDuration } from "../../../util/redux/workout";
import { ColorPalette } from "../../ui/ColorPalette";

export default function WorkoutHeaderDoneButton({ handleOpenModal }) {
  const timer = useSelector((state) => state.workout.timer);
  const dispatch = useDispatch();
  function onPress() {
    dispatch(updateWorkoutDuration({ duration: timer }));
    handleOpenModal();
  }
  return (
    <View style={styles.centeredView}>
      <CustomButton
        onPress={onPress}
        title="Finish"
        iconName="checkmark-outline"
        style={{ margin: 0, paddingVertical: 3 }}
        textColor={ColorPalette.dark.secondary200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
