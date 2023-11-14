import { View, StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutHome from "../components/workout/main/WorkoutHome";
import { ColorPalette } from "../ColorPalette";
import WorkoutActiveStack from "../components/workout/active/main/WorkoutActiveStack";
import WorkoutHistoryMain from "../components/workout/history/WorkoutHistoryMain";
import AndroidScreenHeader from "../components/shared/ui/AndroidScreenHeader";

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
          component={WorkoutActiveStack}
          options={{
            headerShown: false,
            presentation: "modal",
            gestureDuration: 5,
          }}
        />
        {Platform.OS === "ios" ? (
          <Stack.Screen
            name="past"
            component={WorkoutHistoryMain}
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
        ) : (
          <Stack.Screen
            name="past"
            component={WorkoutHistoryMain}
            options={{
              header: (props) => (
                <AndroidScreenHeader
                  goBack={props.navigation.goBack}
                  name={"Workout History"}
                />
              ),
              headerStyle: {
                backgroundColor: ColorPalette.dark.gray700,
              },
              contentStyle: {
                backgroundColor: ColorPalette.dark.gray800,
              },
              title: "Past Workouts",
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
    paddingTop: 50,
    backgroundColor: ColorPalette.dark.gray900,
  },
});
