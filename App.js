import { AppState, StyleSheet, ActivityIndicator, View } from "react-native";
import { init, wipeDatabase } from "./util/sqlite/db";
import { useEffect } from "react";
import { ColorPalette } from "./ColorPalette";
import store from "./util/redux/store";
import { Provider } from "react-redux";
import handleAppClose from "./util/app-state/handleAppClose";
import handleAppOpen from "./util/app-state/handleAppOpen";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import MainTabNavigator from "./MainTabNavigator";

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
      // await wipeDatabase
      await init();
      initNotifications();
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
        <ActivityIndicator size={"large"} color={ColorPalette.dark.gray500} />
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
    backgroundColor: ColorPalette.dark.gray900,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
