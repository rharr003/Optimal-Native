import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import {
  setWorkoutFromAppState,
  incrementTimer,
  stopWorkout,
  addInterval,
} from "../redux/slices/workout";
import { setSavedRestTimer } from "../redux/slices/restTimer";

export default async function handleAppOpen() {
  AsyncStorage.getItem("prevState").then((data) => {
    const prevState = JSON.parse(data);
    store.dispatch(stopWorkout());
    if (prevState && prevState.isActive) {
      const timePassedInSeconds = Math.floor(
        (new Date().getTime() - prevState.timeClosed) / 1000
      );

      store.dispatch(
        incrementTimer({ amount: prevState.currTimer + timePassedInSeconds })
      );
      const interval = setInterval(() => {
        store.dispatch(incrementTimer({ amount: 1 }));
      }, 1000);
      store.dispatch(addInterval(interval));
      // for some reason moving this dispatch to the end of the function prevents a weird flicker on the ActiveWorkoutDisplay
      store.dispatch(
        setWorkoutFromAppState({
          workout: prevState.workout,
          prevWorkout: prevState.prevWorkout,
        })
      );
      // store.dispatch(startWorkout()); removed not sure why i had this in the first place
    }
  });

  AsyncStorage.getItem("prevRestTimerState").then((data) => {
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

    AsyncStorage.removeItem("prevRestTimerState");
  });
}
