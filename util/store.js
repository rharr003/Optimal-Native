import workoutReducer from "./workout";
import restTimerReducer from "./restTimer";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    workout: workoutReducer,
    restTimer: restTimerReducer,
  },
});
