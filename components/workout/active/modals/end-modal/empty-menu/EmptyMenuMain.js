import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../../../../util/redux/slices/workout";
import { stopRestTimer } from "../../../../../../util/redux/slices/restTimer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmpytMenuButtons from "./EmptyMenuButtons";

export default function EmptyMenuMain() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleCancelWorkout() {
    AsyncStorage.removeItem("prevState");
    dispatch(stopWorkout());
    dispatch(stopRestTimer());
    navigation.goBack();
  }
  return <EmpytMenuButtons handleCancelWorkout={handleCancelWorkout} />;
}
