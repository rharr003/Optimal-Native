import { createSlice } from "@reduxjs/toolkit";
import * as Notifications from "expo-notifications";

const restTimerSlice = createSlice({
  name: "restTimer",
  initialState: {
    restTimer: 0,
    restTimerMinimized: false,
    initialRestTime: 0,
    restTimerActive: false,
    timeClosed: null,
  },
  reducers: {
    startRestTimer(state, action) {
      state.initialRestTime = action.payload.restTime;
      state.restTimer = action.payload.restTime;
      state.restTimerActive = true;
    },
    stopRestTimer(state) {
      setTimeout(() => {
        Notifications.cancelAllScheduledNotificationsAsync();
      }, 1000);
      state.restTimerActive = false;
      state.restTimerMinimized = false;
      state.restTimer = 0;
      state.initialRestTime = 0;
    },
    updateAndMinimizeRestTimer(state, action) {
      // prevents timer from beign reactivated if stop rest timer was called before this
      if (action.payload.restTime && state.restTimerActive) {
        state.restTimerMinimized = true;
        state.restTimer = action.payload.restTime;
      }
    },
    incrementRestTimer(state, action) {
      if (state.restTimer + action.payload.amount > state.initialRestTime) {
        state.initialRestTime = state.restTimer + action.payload.amount;
      }
      state.restTimer = state.restTimer + action.payload.amount;
    },
    decrementRestTimer(state, action) {
      if (state.restTimer - action.payload.amount < 0) {
        state.restTimer = 0;
        state.restTimerActive = false;
        return;
      }

      state.restTimer = state.restTimer - action.payload.amount;
      if (state.restTimer === 0) {
        state.restTimerActive = false;
      }
      console.log("rest time acccording to decrement", state.restTimer);
    },
    setSavedRestTimer(state, action) {
      state.restTimerActive = true;
      state.restTimerMinimized = true;
      state.restTimer = action.payload.restTime;
      state.initialRestTime = action.payload.initialRestTime;
    },

    setTimeClosed(state, action) {
      state.timeClosed = new Date().getTime();
    },
  },
});

export const startRestTimer = restTimerSlice.actions.startRestTimer;
export const stopRestTimer = restTimerSlice.actions.stopRestTimer;
export const updateAndMinimizeRestTimer =
  restTimerSlice.actions.updateAndMinimizeRestTimer;
export const incrementRestTimer = restTimerSlice.actions.incrementRestTimer;
export const decrementRestTimer = restTimerSlice.actions.decrementRestTimer;
export const setSavedRestTimer = restTimerSlice.actions.setSavedRestTimer;
export const setTimeClosed = restTimerSlice.actions.setTimeClosed;

export default restTimerSlice.reducer;
