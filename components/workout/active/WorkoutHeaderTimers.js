import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementTimer } from "../../../util/workout";
import { formatTime } from "../../../util/formatTime";
import { stopRestTimer } from "../../../util/restTimer";
import RestTimerCombined from "./RestTimerCombined";

export default function WorkoutHeaderTimer({
  color = "#FFFFFF",
  overRideRestTimer = false,
}) {
  const time = useSelector((state) => state.workout.timer);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const restTimerActive = useSelector(
    (state) => state.restTimer.restTimerActive
  );
  const restTimerMinimized = useSelector(
    (state) => state.restTimer.restTimerMinimized
  );
  function finishRestTimer() {
    dispatch(stopRestTimer());
  }
  // should refactor this to not re-render every time we increase the workout timer
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        dispatch(incrementTimer({ amount: 1 }));
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

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
