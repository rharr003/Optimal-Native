import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./redux/store";
import {
  startWorkout,
  setWorkout,
  incrementTimer,
  stopWorkout,
  addInterval,
} from "./redux/workout";
import { setSavedRestTimer } from "./redux/restTimer";

export default async function handleAppOpen() {
  console.log("handleAppOpen");
  await AsyncStorage.getItem("prevState").then((data) => {
    const prevState = JSON.parse(data);
    store.dispatch(stopWorkout());
    if (prevState && prevState.isActive) {
      const timePassedInSeconds = Math.floor(
        (new Date().getTime() - prevState.timeClosed) / 1000
      );

      store.dispatch(setWorkout(prevState.workout));
      store.dispatch(
        incrementTimer({ amount: prevState.currTimer + timePassedInSeconds })
      );
      const interval = setInterval(() => {
        store.dispatch(incrementTimer({ amount: 1 }));
      }, 1000);
      store.dispatch(addInterval(interval));
      store.dispatch(startWorkout());
    }
  });

  await AsyncStorage.getItem("prevRestTimerState").then((data) => {
    const prevRestTimerState = JSON.parse(data);
    if (prevRestTimerState && prevRestTimerState.restTimerActive) {
      const timePassedInSeconds = Math.ceil(
        (new Date().getTime() - prevRestTimerState.timeClosed) / 1000
      );
      store.dispatch(
        setSavedRestTimer({
          restTime: prevRestTimerState.restTimer - timePassedInSeconds,
          initialRestTime: prevRestTimerState.initialRestTime,
        })
      );
    }
  });
}
