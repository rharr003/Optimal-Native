import workoutReducer from "./slices/workout";
import restTimerReducer from "./slices/restTimer";
import userDataReducer from "./slices/userData";
import widgetsReducer from "./slices/widgets";
import templateReducer from "./slices/templates";
import exerciseReducer from "./slices/exercises";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    workout: workoutReducer,
    restTimer: restTimerReducer,
    userData: userDataReducer,
    widgets: widgetsReducer,
    templates: templateReducer,
    exercises: exerciseReducer,
  },
});
