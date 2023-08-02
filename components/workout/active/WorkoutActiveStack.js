import { ColorPalette } from "../../ui/ColorPalette";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutActiveMain from "./WorkoutActiveMain";
import WorkoutHeaderTimer from "../main/WorkoutHeaderTimer";
import AddExerciseModal from "../add-exercise-modal/AddExerciseModal";
import ManageExerciseModalStack from "../../deprecated/DEPRECATED_ManageExerciseModalStack";

const Stack = createNativeStackNavigator();

export default function WorkoutActive({ navigation }) {
  function toggleExerciseModal(e, data = { isReplacing: false }) {
    navigation.navigate("addExercise", data);
    navigation.setOptions({
      gestureEnabled: false,
    });
  }

  function enableGesture() {
    navigation.setOptions({
      gestureEnabled: true,
    });
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: ColorPalette.dark.gray600,
        },
        headerTintColor: ColorPalette.dark.gray100,
        contentStyle: {
          backgroundColor: ColorPalette.dark.gray700,
        },
      }}
    >
      <Stack.Screen
        name="main"
        options={{
          headerLeft: () => <WorkoutHeaderTimer />,
          title: "Workout",
        }}
      >
        {() => (
          <WorkoutActiveMain
            onFocus={enableGesture}
            toggleExerciseModal={toggleExerciseModal}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="addExercise"
        component={AddExerciseModal}
        options={{
          title: "Add Exercise",
        }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "transparentModal",
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      ></Stack.Group>
    </Stack.Navigator>
  );
}
