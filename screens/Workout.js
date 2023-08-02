import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutHome from "../components/workout/main/WorkoutHome";
import { ColorPalette } from "../components/ui/ColorPalette";
import WorkoutActive from "../components/workout/active/WorkoutActiveStack";

const Stack = createNativeStackNavigator();

export default function Workout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: ColorPalette.dark.gray800,
        },
        headerTintColor: ColorPalette.dark.gray100,
        contentStyle: {
          backgroundColor: ColorPalette.dark.gray900,
        },
      }}
    >
      <Stack.Screen
        name="home"
        component={WorkoutHome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="active"
        component={WorkoutActive}
        options={{
          presentation: "modal",
          headerShown: false,
          gestureDuration: 5,
        }}
      />
    </Stack.Navigator>
  );
}
