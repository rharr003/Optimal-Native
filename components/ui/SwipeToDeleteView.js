import { StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import * as Haptics from "expo-haptics";

export default function SwipeToDeleteView({
  setNum,
  children,
  removeSet,
  activeIdx,
  idxRemoved,
  setIdxRemoved,
}) {
  const { width } = useWindowDimensions();
  const offset = useSharedValue({ x: 0 });
  const height = useSharedValue(50);
  const padding = useSharedValue(5);
  const opacity = useSharedValue(1);
  const hasCrossed = useSharedValue(0);

  useEffect(() => {
    if (idxRemoved.indexOf(setNum - 1) !== -1) {
      setIdxRemoved([]);
    }
  }, [setNum]);

  function handleRemove() {
    removeSet(setNum - 1);
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value.x }],
      opacity: opacity.value,
      height: height.value,
      paddingBottom: padding.value,
    };
  }, []);

  const gesture = Gesture.Pan()
    .activeOffsetX(-10)
    .onBegin(() => {
      // ensures that the gesture is only active on one set to avoid multiple simultaneous updates to the same state array causing issues
      if (!activeIdx.value) {
        activeIdx.value = setNum - 1;
      }
    })
    .onUpdate((event) => {
      if (activeIdx.value === setNum - 1) {
        offset.value = {
          // ensures that the set can only be dragged to the left
          x: Math.min(event.translationX, 0),
        };

        // haptic feedback when the set is dragged past the point needed to delete it and when it is dragged back into the safe zone

        if (event.translationX < -200 && hasCrossed.value === 0) {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
          hasCrossed.value = 1;
        }

        if (event.translationX > -200 && hasCrossed.value === 1) {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
          hasCrossed.value = 0;
        }
      } else {
        offset.value = {
          x: 0,
        };
      }
    })
    .onEnd((event) => {
      // if the set is dragged past the point needed to delete it, animate it out of view and then remove it from the state array we check the offset value to prevent an issue where sets that were released in the safe zone and resetting would sometimes be removed if the user deleted another set in quick succession
      if (
        event.translationX < -200 &&
        activeIdx.value === setNum - 1 &&
        offset.value.x < 200
      ) {
        opacity.value = withTiming(0);
        height.value = withTiming(0);
        padding.value = withTiming(0);
        offset.value = {
          x: withTiming(0 - width, undefined, (isFinished) => {
            // give the animation time to finish before removing the set from the state array
            if (isFinished) {
              runOnJS(handleRemove)();
              offset.value = {
                x: 0,
              };
            }
          }),
        };
      } else if (activeIdx.value === setNum - 1) {
        // if the set is released in the safe zone, animate it back to its original position
        offset.value = {
          x: withTiming(0),
        };
      }
      // reset the activeIdx value so that the gesture is no longer active allowing other gestures to be activated
      activeIdx.value = null;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
