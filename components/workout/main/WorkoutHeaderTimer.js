import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { ColorPalette } from "../../ui/ColorPalette";
import { useDispatch, useSelector } from "react-redux";
import { incrementTimer } from "../../../util/workout";
import { formatTime } from "../../../util/formatTime";

export default function WorkoutHeaderTimer({ color = "#FFFFFF" }) {
  const time = useSelector((state) => state.workout.timer);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);

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
    <View>
      <Text style={[styles.text, { color: color }]}>{formatTime(time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});
