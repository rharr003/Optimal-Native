import { ColorPalette } from "../ui/ColorPalette";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExerciseModalMainMenu from "../workout/manage-modal/ManageExerciseModalMainMenu";
import AddExerciseModal from "../workout/add-exercise-modal/AddExerciseModal";
import { View, Text, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function ManageExerciseModalStack({ route }) {
  const { index, exercise } = route.params;
  return (
    <BlurView
      intensity={15}
      tint="dark"
      style={{
        flex: 1,
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="ManageExerciseModal">
          {() => (
            <ManageExerciseModalMainMenu index={index} exercise={exercise} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ReplaceExercise"
          component={AddExerciseModal}
          options={{
            title: "Replace Exercise",
            headerShown: true,
            contentStyle: {
              backgroundColor: ColorPalette.dark.gray900,
            },
            headerStyle: {
              backgroundColor: ColorPalette.dark.gray800,
            },
          }}
        />
      </Stack.Navigator>
    </BlurView>
  );
}
