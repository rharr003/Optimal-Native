import { ColorPalette } from "../../../ColorPalette";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutActiveMain from "./WorkoutActiveMain";
import WorkoutHeaderTimer from "./WorkoutHeaderTimers";
import AddExercise from "../add-exercise/AddExercise";
import WorkoutHeaderTitle from "./WorkoutHeaderTitle";

const Stack = createNativeStackNavigator();

export default function WorkoutActive({ navigation, route }) {
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
          headerLeft: () => <WorkoutHeaderTimer />,
          headerTitle: () => <WorkoutHeaderTitle />,
          title: "Workout",
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
