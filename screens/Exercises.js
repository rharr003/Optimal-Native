import { View, StyleSheet, Platform } from "react-native";
import { ColorPalette } from "../ColorPalette";
import ExerciseDetail from "../components/exercises/detail/ExerciseDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExercisesMain from "../components/exercises/main/ExercisesMain";
import HeaderAndroid from "../components/exercises/detail/HeaderAndroid";

const Stack = createNativeStackNavigator();

export default function Exercises() {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: ColorPalette.dark.gray900,
          },
          headerTintColor: ColorPalette.dark.gray100,
          contentStyle: {
            backgroundColor: ColorPalette.dark.gray900,
          },
        }}
      >
        <Stack.Screen
          name="home"
          component={ExercisesMain}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: ColorPalette.dark.gray900,
            },
          }}
        />

        {Platform.OS === "ios" ? (
          <Stack.Screen
            name="exerciseDetails"
            component={ExerciseDetail}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: ColorPalette.dark.gray900,
              },
              contentStyle: {
                backgroundColor: ColorPalette.dark.gray900,
              },
              presentation: "modal",
            }}
          />
        ) : (
          <Stack.Screen
            name="exerciseDetails"
            component={ExerciseDetail}
            options={{
              headerShown: true,
              header: (props) => (
                <HeaderAndroid
                  goBack={props.navigation.goBack}
                  name={props.route.params.exercise.name}
                />
              ),
              headerStyle: {
                backgroundColor: ColorPalette.dark.gray900,
              },
              contentStyle: {
                backgroundColor: ColorPalette.dark.gray900,
              },
            }}
          />
        )}
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.dark.gray900,
    paddingTop: 50,
  },
});
