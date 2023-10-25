import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";

export default function persistRestTimer(initialRestTime, currentRestTime) {
  console.log(initialRestTime, currentRestTime);
  const state = store.getState().restTimer;
  console.log(state.restTimerActive);
  if (state.restTimerActive) {
    AsyncStorage.setItem(
      "prevRestTimerState",
      JSON.stringify({
        restTimerActive: true,
        restTimer: currentRestTime,
        initialRestTime: initialRestTime,
        timeClosed: new Date().getTime(),
      })
    );
  }
}
