import { StyleSheet, View } from "react-native";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../../ColorPalette";

export default function SwipeToDeleteView({
  index,
  children,
  removeSet,
  activeIdx,
  idxRemoved,
  setIdxRemoved = () => {},
}) {
  const { width } = useWindowDimensions();
  const offset = useSharedValue({ x: 0 });
  const height = useSharedValue(50);
  const padding = useSharedValue(5);
  const opacity = useSharedValue(1);
  const hasCrossed = useSharedValue(0);

  useEffect(() => {
    if (idxRemoved?.indexOf(index) !== -1) {
      setIdxRemoved([]);
    }
  }, [index]);

  function handleRemove() {
    removeSet(index);
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
        activeIdx.value = index;
      }
    })
    .onUpdate((event) => {
      if (activeIdx.value === index) {
        offset.value = {
          // ensures that the set can only be dragged to the left
          x: Math.min(event.translationX, 0),
        };

        // haptic feedback when the set is dragged past the point needed to delete it and when it is dragged back into the safe zone

        if (event.translationX < -width * 0.7 && hasCrossed.value === 0) {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
          hasCrossed.value = 1;
        }

        if (event.translationX > -width * 0.7 && hasCrossed.value === 1) {
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
        event.translationX < -width * 0.7 &&
        activeIdx.value === index &&
        offset.value.x < width * 0.7
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
      } else if (activeIdx.value === index) {
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
        <View style={styles.innerContainer}>
          {children}
          <View style={styles.deleteView}>
            <Ionicons
              name="trash-outline"
              size={26}
              color={"#FFFFFF"}
              style={{ marginLeft: 25 }}
            />
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  innerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteView: {
    backgroundColor: ColorPalette.dark.errorDark,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
