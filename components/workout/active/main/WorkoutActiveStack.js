import { ColorPalette } from "../../../../ColorPalette";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutActiveMain from "./WorkoutActiveMain";
import WorkoutTimers from "../../shared/WorkoutTimers";
import AddExercise from "../add-exercise/AddExercise";
import WorkoutName from "./header/WorkoutName";

const Stack = createNativeStackNavigator();

export default function WorkoutActive({ route }) {
  const { interval } = route.params;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: ColorPalette.dark.gray700,
        },
        headerTintColor: ColorPalette.dark.gray100,
        contentStyle: {
          backgroundColor: ColorPalette.dark.gray800,
        },
      }}
    >
      <Stack.Screen
        name="main"
        options={{
          headerLeft: WorkoutTimers,
          headerTitle: WorkoutName,
          title: "Workout",
          presentation: "modal",
        }}
      >
        {() => <WorkoutActiveMain interval={interval} />}
      </Stack.Screen>
      <Stack.Screen
        name="addExercise"
        component={AddExercise}
        options={{
          title: "Add Exercise",
        }}
      />
    </Stack.Navigator>
  );
}
