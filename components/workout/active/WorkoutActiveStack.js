import { ColorPalette } from "../../ui/ColorPalette";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutActiveMain from "./WorkoutActiveMain";
import WorkoutHeaderTimer from "./WorkoutHeaderTimers";
import AddExerciseModal from "../modals/add-exercise-modal/AddExerciseModal";

const Stack = createNativeStackNavigator();

export default function WorkoutActive({ navigation }) {
  // we define this here because if you set the navigation options in the component it is reffering to a different navigation object and will not disable the swipe to close gesture on the modal
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
    </Stack.Navigator>
  );
}
