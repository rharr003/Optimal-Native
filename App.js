import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, AppState, AppConfig } from "react-native";
import { init, wipeDatabase } from "./util/db";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Workout from "./screens/Workout";
import Stats from "./screens/Stats";
import { ColorPalette } from "./components/ui/ColorPalette";
import store from "./util/store";
import { Provider } from "react-redux";
import handleAppClose from "./util/handleAppClose";
import handleAppOpen from "./util/handleAppOpen";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    init();

    //wipeDatabase();
  }, []);

  useEffect(() => {
    if (appState === "active") {
      handleAppOpen();
    }

    const subscription = AppState.addEventListener("change", (newState) => {
      if (newState.match(/inactive|background/)) {
        handleAppClose();
      }
      setAppState(newState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: ColorPalette.dark.gray800,
            },
            tabBarStyle: {
              backgroundColor: ColorPalette.dark.gray800,
            },
            contentStyle: {
              backgroundColor: ColorPalette.dark.gray900,
            },
            tabBarActiveTintColor: ColorPalette.dark.secondary200,
            headerTintColor: ColorPalette.dark.gray100,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Workout"
            component={Workout}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="barbell-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Stats"
            component={Stats}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="trending-up-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
