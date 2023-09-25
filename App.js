import { AppState, StyleSheet, View, Text } from "react-native";
import { init, wipeDatabase } from "./util/sqlite/db";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Workout from "./screens/Workout";
import Stats from "./screens/Stats";
import Exercises from "./screens/Exercises";
import { ColorPalette } from "./ColorPalette";
import store from "./util/redux/store";
import { Provider } from "react-redux";
import handleAppClose from "./util/handleAppClose";
import handleAppOpen from "./util/handleAppOpen";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";
import { MenuProvider } from "react-native-popup-menu";
import UserProfile from "./screens/UserProfile";
("react-native-orientation-locker");

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
    // wipeDatabase();

    init();

    initNotifications();
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
    <>
      <MenuProvider customStyles={{ backdrop: styles.backdrop }}>
        <Provider store={store}>
          <NavigationContainer>
            <Tab.Navigator
              lockOrientation="portrait"
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
                name="Tracking"
                component={Stats}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons
                      name="stats-chart-outline"
                      color={color}
                      size={size}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Workout"
                component={Workout}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add-outline" color={color} size={36} />
                  ),
                }}
              />
              <Tab.Screen
                name="Exercises"
                component={Exercises}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons
                      name="barbell-outline"
                      color={color}
                      size={size}
                    />
                  ),
                  contentStyle: {
                    backgroundColor: ColorPalette.dark.gray800,
                  },
                }}
              />
              <Tab.Screen
                name="Profile"
                component={UserProfile}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </Provider>
      </MenuProvider>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 10,
  },
});
