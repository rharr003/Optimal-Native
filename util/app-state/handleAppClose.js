import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";

export default function handleAppClose() {
  const state = store.getState().workout;
  if (state.isActive) {
    AsyncStorage.setItem(
      "prevState",
      JSON.stringify({
        workout: state.workout,
        prevWorkout: state.prevWorkout,
        isActive: state.isActive,
        timeClosed: new Date().getTime(),
        currTimer: state.timer,
      })
    );
  }
}
