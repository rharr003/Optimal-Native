import { View, StyleSheet } from "react-native";
import {
  incrementTimer,
  addInterval,
} from "../../../util/redux/slices/workout";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import MainButtons from "./main-buttons/MainButtons";
import ActiveWorkoutDisplay from "./active-workout-display/ActiveWorkoutDisplay";
import TemplatesMain from "./workout-templates/TemplatesMain";

export default function WorkoutHome({ navigation }) {
  const dispatch = useDispatch();
  const workoutIsActive = useSelector((state) => state.workout.isActive);
  const interval = useRef(null);

  // restart the workout duration timer on intitial app load if a workout was active upon the last app close
  useEffect(() => {
    if (workoutIsActive && !interval.current) {
      interval.current = setInterval(() => {
        dispatch(incrementTimer({ amount: 1 }));
      }, 1000);

      dispatch(addInterval(interval.current));
    }
  }, []);

  return (
    <View style={styles.container}>
      {workoutIsActive && <ActiveWorkoutDisplay />}
      <MainButtons
        interval={interval}
        workoutIsActive={workoutIsActive}
        navigation={navigation}
        dispatch={dispatch}
      />
      <TemplatesMain />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
});
