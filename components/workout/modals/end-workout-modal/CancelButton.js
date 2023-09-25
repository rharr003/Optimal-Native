import CustomButton from "../../../shared/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../../util/redux/workout";
import { stopRestTimer } from "../../../../util/redux/restTimer";
import { ColorPalette } from "../../../../ColorPalette";

export default function CancelButton() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleCancelWorkout() {
    dispatch(stopWorkout());
    dispatch(stopRestTimer());
    navigation.goBack();
  }
  return (
    <CustomButton
      title="Cancel Workout"
      onPress={handleCancelWorkout}
      iconName={"trash-outline"}
      style={{
        margin: 0,
        paddingVertical: 3,
        width: "90%",
      }}
      color={ColorPalette.dark.error}
      textColor="#FFFFFF"
    />
  );
}
