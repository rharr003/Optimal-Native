import * as Notifications from "expo-notifications";

export async function scheduleRestTimerNotification(delay) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Rest Timer Complete",
      body: "Get back to work!",
      sound: "restTimerComplete.wav",
    },
    trigger: {
      seconds: delay,
    },
  });
}

export function cancelRestTimerNotifications() {
  Notifications.cancelAllScheduledNotificationsAsync();
}
