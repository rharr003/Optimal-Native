// import { useLayoutEffect } from "react";
// import { View } from "react-native";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";
// import { useAnimatedStyle, runOnJS } from "react-native-reanimated";
// import {
//   useSharedValue,
//   withTiming,
//   withSpring,
// } from "react-native-reanimated";
// import { useWindowDimensions } from "react-native";
// import React from "react";

// export default function SwipeLeftGestureHandler({
//   children,
//   onSwipeComplete,
//   swipeThreshold,
//   childrenHeight,
//   childrenPadding,
// }) {
//   const { width } = useWindowDimensions();
//   const offset = useSharedValue({ x: 0 });
//   const opacity = useSharedValue(1);
//   const height = useSharedValue(childrenHeight);
//   const padding = useSharedValue(childrenPadding);

//   useLayoutEffect(() => {
//     offset.value = {
//       x: 0,
//     };
//     opacity.value = 1;
//     height.value = childrenHeight;
//     padding.value = childrenPadding;
//   }, [set]);

//   const animatedRightStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: offset.value.x }],
//       opacity: opacity.value,
//       height: height.value,
//       padding: padding.value,
//     };
//   });

//   const animatedLeftStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: offset.value.x }],
//       opacity: opacity.value,
//       height: height.value,
//       padding: padding.value,
//     };
//   });

//   const gesture = Gesture.Pan()
//     .onBegin((event) => {})
//     .onUpdate((event) => {
//       offset.value = {
//         x: Math.min(0, event.translationX),
//       };
//     })
//     .onEnd((event) => {
//       if (event.translationX < swipeThreshold) {
//         opacity.value = withTiming(0);
//         height.value = withTiming(0);
//         padding.value = withTiming(0);

//         offset.value = {
//           x: withTiming(0 - width, undefined, (isFinished) => {
//             if (isFinished) {
//               runOnJS(onSwipeComplete)();
//             }
//           }),
//         };
//       } else {
//         offset.value = {
//           x: withSpring(0),
//         };
//       }
//     });

//   return (
//     <GestureDetector gesture={gesture}>
//       <View style={{ flexDirection: "row" }}>
//         {React.cloneElement(children, {
//           leftStyle: animatedLeftStyles,
//           rightStyle: animatedRightStyles,
//         })}
//       </View>
//     </GestureDetector>
//   );
// }
