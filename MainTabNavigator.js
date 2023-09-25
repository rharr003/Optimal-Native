import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Workout from "./screens/Workout";
import Tracking from "./screens/Tracking";
import Exercises from "./screens/Exercises";
import UserProfile from "./screens/UserProfile";
import { ColorPalette } from "./ColorPalette";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: ColorPalette.dark.gray800,
  },
  contentStyle: {
    backgroundColor: ColorPalette.dark.gray900,
  },
  tabBarActiveTintColor: ColorPalette.dark.secondary200,
  headerTintColor: ColorPalette.dark.gray100,
};

export default function MainTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator lockOrientation="portrait" screenOptions={screenOptions}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
            title: "Home",
          }}
        />
        <Tab.Screen
          name="tracking"
          component={Tracking}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" color={color} size={size} />
            ),
            title: "Tracking",
          }}
        />
        <Tab.Screen
          name="workout"
          component={Workout}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-outline" color={color} size={36} />
            ),
            title: "Workout",
          }}
        />
        <Tab.Screen
          name="exercises"
          component={Exercises}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barbell-outline" color={color} size={size} />
            ),
            contentStyle: {
              backgroundColor: ColorPalette.dark.gray800,
            },
            title: "Exercises",
          }}
        />
        <Tab.Screen
          name="profile"
          component={UserProfile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
            title: "Profile",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
