import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./store";
import {
  startWorkout,
  setWorkout,
  incrementTimer,
  stopWorkout,
} from "./workout";

export default async function handleAppOpen() {
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
      store.dispatch(startWorkout());
    }
  });
}
