import workoutReducer from "./workout";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    workout: workoutReducer,
  },
});
