import { View, Text, StyleSheet } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { formatTime } from "../../../util/formatTime";
import { stopRestTimer } from "../../../util/redux/slices/restTimer";
import RestTimerCombined from "../active/shared/RestTimerCombined";

export default function WorkoutTimers({
  color = "#FFFFFF",
  overRideRestTimer = false,
}) {
  const time = useSelector((state) => state.workout.timer);
  const dispatch = useDispatch();

  const restTimerActive = useSelector(
    (state) => state.restTimer.restTimerActive
  );
  const restTimerMinimized = useSelector(
    (state) => state.restTimer.restTimerMinimized
  );

  function finishRestTimer() {
    dispatch(stopRestTimer());
  }

  return (
    <>
      {restTimerActive && restTimerMinimized && !overRideRestTimer ? (
        <RestTimerCombined
          finishRestTimer={finishRestTimer}
          size={40}
          isMinimized={true}
          strokeWidth={4}
          trailStrokeWidth={6}
        />
      ) : (
        <View>
          <Text style={[styles.text, { color: color }]}>
            {formatTime(time)}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});
