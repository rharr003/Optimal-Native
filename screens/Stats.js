import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorPalette } from "../components/ui/ColorPalette";
import StatsHome from "../components/stats/StatsHome";
import StatDetail from "../components/stats/detail/StatDetail";

const Stack = createNativeStackNavigator();
export default function Stats() {
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
          name="home"
          component={StatsHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detail"
          component={StatDetail}
          options={{
            presentation: "modal",
            headerShown: true,
            headerStyle: {
              backgroundColor: ColorPalette.dark.gray700,
            },
            headerTintColor: ColorPalette.dark.gray100,
            contentStyle: {
              backgroundColor: ColorPalette.dark.gray800,
            },
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
