import { StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useAnimatedStyle, runOnJS } from "react-native-reanimated";
import {
  useSharedValue,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import ExerciseSetCells from "./ExerciseSet";

export default function WorkoutSetGestureContainer({
  set,
  setNum,
  exerciseId,
  restTime,
  removeSet,
  updateSet,
  completeSet,
  activeIdx,
  setActiveIdx,
}) {
  const { width } = useWindowDimensions();
  const offset = useSharedValue({ x: 0 });
  const marginBottom = useSharedValue(0);
  const opacity = useSharedValue(1);

  function handleRemove() {
    removeSet(setNum - 1);
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value.x }],
      opacity: opacity.value,
      marginBottom: marginBottom.value,
    };
  }, []);

  const gesture = Gesture.Pan()
    .activeOffsetX(-10)
    .onBegin((event) => {
      if (!activeIdx) {
        runOnJS(setActiveIdx)(setNum - 1);
      }
    })
    .onUpdate((event) => {
      if (activeIdx === setNum - 1) {
        offset.value = {
          x: Math.min(event.translationX, 0),
        };
      } else {
        offset.value = {
          x: 0,
        };
      }
    })
    .onEnd((event) => {
      if (
        event.translationX < -200 &&
        activeIdx === setNum - 1 &&
        offset.value.x < 200
      ) {
        opacity.value = withSequence(
          withTiming(0),
          withTiming(1, { duration: 300 })
        );

        marginBottom.value = withSequence(
          withTiming(-50),
          withTiming(0, { duration: 300 })
        );
        offset.value = {
          x: withTiming(0 - width, undefined, (isFinished) => {
            if (isFinished) {
              runOnJS(handleRemove)();
              offset.value = {
                x: 0,
              };
            }
          }),
        };
      } else if (activeIdx === setNum - 1) {
        offset.value = {
          x: withTiming(0),
        };
      }
      runOnJS(setActiveIdx)(null);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <ExerciseSetCells
          set={set}
          setNum={setNum}
          restTime={restTime}
          exerciseId={exerciseId}
          completeSet={completeSet}
          updateSet={updateSet}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
