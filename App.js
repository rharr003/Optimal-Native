import { AppState, ActivityIndicator, View, StyleSheet } from "react-native";
import { init, wipeDatabase } from "./util/sqlite/db";
import { useEffect } from "react";
import store from "./util/redux/store";
import { Provider } from "react-redux";
import handleAppClose from "./util/app-state/handleAppClose";
import handleAppOpen from "./util/app-state/handleAppOpen";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import MainTabNavigator from "./MainTabNavigator";
import * as SplashScreen from "expo-splash-screen";
import { ColorPalette } from "./ColorPalette";
import { scheduleRestTimerNotification } from "./util/app-state/restTimerNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
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

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [loading, setLoading] = useState(true);
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
    async function load() {
      await init();
      await initNotifications();
      setLoading(false);
    }
    load();
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

  if (loading) {
    return (
      <View style={styles.backdrop}>
        <ActivityIndicator color={ColorPalette.dark.gray500} size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <MainTabNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: ColorPalette.dark.gray800,
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});
