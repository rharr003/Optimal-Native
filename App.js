import { AppState } from "react-native";
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

SplashScreen.preventAutoHideAsync();

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
    async function load() {
      // await wipeDatabase();
      await init();
      initNotifications();
      await SplashScreen.hideAsync();
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

  return (
    <Provider store={store}>
      <MainTabNavigator />
    </Provider>
  );
}
