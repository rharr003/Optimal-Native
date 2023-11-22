import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../../../../util/redux/slices/workout";
import { stopRestTimer } from "../../../../../../util/redux/slices/restTimer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmpytMenuButtons from "./EmptyMenuButtons";
import { cancelRestTimerNotifications } from "../../../../../../util/app-state/restTimerNotification";

export default function EmptyMenuMain() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleCancelWorkout() {
    cancelRestTimerNotifications();
    AsyncStorage.removeItem("prevState");
    dispatch(stopWorkout());
    dispatch(stopRestTimer());
    navigation.goBack();
  }
  return <EmpytMenuButtons handleCancelWorkout={handleCancelWorkout} />;
}
