import { useDispatch } from "react-redux";
import {
  stopWorkout,
  clearAllIntervals,
} from "../../../../../util/redux/slices/workout";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WorkoutFooterButtons from "./WorkoutFooterButtons";

export default function WorkoutFooter({ interval }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function cancelWorkout() {
    dispatch(stopWorkout());
    //stop the workout duration timer
    clearInterval(interval.current);
    dispatch(clearAllIntervals());
    // removes the saved workout from AsyncStorage
    await AsyncStorage.removeItem("prevState");
    interval.current = null;
    navigation.goBack();
  }

  function openAddExercise() {
    navigation.navigate("addExercise", { isReplacing: false });
  }

  return (
    <WorkoutFooterButtons
      openAddExercise={openAddExercise}
      cancelWorkout={cancelWorkout}
    />
  );
}
