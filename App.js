import { AppState, StyleSheet } from "react-native";
import { init, wipeDatabase } from "./util/sqlite/db";
import { useEffect } from "react";
import { ColorPalette } from "./ColorPalette";
import store from "./util/redux/store";
import { Provider } from "react-redux";
import handleAppClose from "./util/handleAppClose";
import handleAppOpen from "./util/handleAppOpen";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import { MenuProvider } from "react-native-popup-menu";
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
    <MenuProvider customStyles={{ backdrop: styles.backdrop }}>
      <Provider store={store}>
        <MainTabNavigator />
      </Provider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 10,
  },
});
