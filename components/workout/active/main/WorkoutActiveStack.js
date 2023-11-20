import { ColorPalette } from "../../../../ColorPalette";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutActiveMain from "./WorkoutActiveMain";
import WorkoutTimers from "../../shared/WorkoutTimers";
import AddExercise from "../add-exercise/AddExercise";
import WorkoutName from "./header/WorkoutName";
import { Platform } from "react-native";
import HeaderAndroid from "./header/HeaderAndroid";

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
      {Platform.OS === "ios" ? (
        <Stack.Screen
          name="main"
          options={{
            title: "Workout",
            headerLeft: WorkoutTimers,
            headerTitle: WorkoutName,
            presentation: "modal",
          }}
        >
          {() => <WorkoutActiveMain interval={interval} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="main"
          options={{
            header: (props) => (
              <HeaderAndroid goBack={props.navigation.goBack} />
            ),
          }}
        >
          {() => <WorkoutActiveMain interval={interval} />}
        </Stack.Screen>
      )}

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
