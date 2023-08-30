import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutHome from "../components/workout/main/WorkoutHome";
import { ColorPalette } from "../components/ui/ColorPalette";
import WorkoutActive from "../components/workout/active/WorkoutActiveStack";
import WorkoutList from "../components/workout/history/WorkoutList";

const Stack = createNativeStackNavigator();

export default function Workout() {
  return (
    <View style={styles.container}>
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

        <Stack.Screen
          name="past"
          component={WorkoutList}
          options={{
            presentation: "modal",
            headerStyle: {
              backgroundColor: ColorPalette.dark.gray700,
            },
            contentStyle: {
              backgroundColor: ColorPalette.dark.gray800,
            },
            title: "Past Workouts",
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: ColorPalette.dark.gray900,
  },
});
