import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import MainButtons from "./main-buttons/MainButtons";
import ActiveWorkoutDisplay from "./active-workout-display/ActiveWorkoutDisplay";
import TemplatesMain from "./workout-templates/TemplatesMain";

export default function WorkoutHome({ navigation }) {
  const dispatch = useDispatch();
  const workoutIsActive = useSelector((state) => state.workout.isActive);
  const interval = useRef(null);

  return (
    <View style={styles.container}>
      <TemplatesMain />
      {workoutIsActive && (
        <ActiveWorkoutDisplay interval={interval} navigation={navigation} />
      )}
      <MainButtons
        interval={interval}
        workoutIsActive={workoutIsActive}
        navigation={navigation}
        dispatch={dispatch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingBottom: 20,
    flex: 1,
  },
});
