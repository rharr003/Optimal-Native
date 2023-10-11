import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../../../../util/redux/slices/workout";
import { stopRestTimer } from "../../../../../../util/redux/slices/restTimer";
import EmpytMenuButtons from "./EmptyMenuButtons";

export default function EmptyMenuMain() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleCancelWorkout() {
    dispatch(stopWorkout());
    dispatch(stopRestTimer());
    navigation.goBack();
  }
  return <EmpytMenuButtons handleCancelWorkout={handleCancelWorkout} />;
}
