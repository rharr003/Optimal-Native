import { View, StyleSheet, Platform, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorPalette } from "../ColorPalette";
import TrackingMain from "../components/tracking/main/TrackingMain";
import WeightDetailMain from "../components/tracking/weight-detail/WeightDetailMain";
import AndroidScreenHeader from "../components/shared/ui/AndroidScreenHeader";

const Stack = createNativeStackNavigator();
export default function Tracking() {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: ColorPalette.dark.gray900,
          },
        }}
      >
        <Stack.Screen
          name="main"
          component={TrackingMain}
          options={{
            headerShown: false,
          }}
        />
        {Platform.OS === "ios" ? (
          <Stack.Screen
            name="weight-detail"
            component={WeightDetailMain}
            options={{
              presentation: "modal",
              title: "Weight",
              headerShown: false,
              headerStyle: {
                backgroundColor: ColorPalette.dark.gray700,
              },
              headerTintColor: ColorPalette.dark.gray100,
              contentStyle: {
                backgroundColor: ColorPalette.dark.gray800,
              },
            }}
          />
        ) : (
          <Stack.Screen
            name="weight-detail"
            component={WeightDetailMain}
            options={{
              title: "Weight",
              headerShown: true,
              header: (props) => (
                <AndroidScreenHeader
                  goBack={props.navigation.goBack}
                  name={"Weight"}
                />
              ),
              headerStyle: {
                backgroundColor: ColorPalette.dark.gray700,
              },
              headerTintColor: ColorPalette.dark.gray100,
              contentStyle: {
                backgroundColor: ColorPalette.dark.gray800,
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
    paddingTop: 50,
    backgroundColor: ColorPalette.dark.gray900,
  },
});
