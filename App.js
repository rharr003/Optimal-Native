import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  AppState,
  AppConfig,
  SafeAreaView,
} from "react-native";
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
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

const requestNotificationsAsync = async () => {
  const { granted } = await Notifications.requestPermissionsAsync();
  return granted;
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);
  async function initNotifications() {
    const allowed = await allowsNotificationsAsync();
    if (!allowed) {
      const granted = await requestNotificationsAsync();
      if (!granted) {
        return;
      }
    }
  }

  useEffect(() => {
    init();
    initNotifications();

    // wipeDatabase();
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
            headerShown: false,
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
