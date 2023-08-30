import workoutReducer from "./workout";
import restTimerReducer from "./restTimer";
import userDataReducer from "./userData";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    workout: workoutReducer,
    restTimer: restTimerReducer,
    userData: userDataReducer,
  },
});
