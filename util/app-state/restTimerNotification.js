import * as Notifications from "expo-notifications";

export function scheduleRestTimerNotification(delay) {
  Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Rest Timer",
      body: "Get back to work!",
    },
    trigger: {
      seconds: delay,
    },
  });
}
