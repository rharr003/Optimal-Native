import { View, StyleSheet } from "react-native";
import { ColorPalette } from "../ColorPalette";
import ExerciseDetail from "../components/exercises/detail/ExerciseDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExercisesMain from "../components/exercises/main/ExercisesMain";

const Stack = createNativeStackNavigator();

export default function Exercises() {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: ColorPalette.dark.gray800,
          },
          headerTintColor: ColorPalette.dark.gray100,
          contentStyle: {
            backgroundColor: ColorPalette.dark.gray800,
          },
        }}
      >
        <Stack.Screen
          name="home"
          component={ExercisesMain}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: ColorPalette.dark.gray800,
            },
          }}
        />
        <Stack.Screen
          name="exerciseDetails"
          component={ExerciseDetail}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: ColorPalette.dark.gray700,
            },
            contentStyle: {
              backgroundColor: ColorPalette.dark.gray800,
            },
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.dark.gray800,
    paddingTop: 50,
  },
});
