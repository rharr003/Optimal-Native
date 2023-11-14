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
    lastDecrent: Date.now(),
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
      // prevents timer from being reactivated if stop rest timer was called before this
      if (action.payload.restTime && state.restTimerActive) {
        state.restTimerMinimized = true;
        // state.restTimer = action.payload.restTime;
      }
    },
    incrementRestTimerBy15(state) {
      if (state.restTimer + 15 > state.initialRestTime) {
        state.initialRestTime = state.restTimer + 15;
      }
      state.restTimer += 15;
    },

    decrementRestTimerBy15(state) {
      if (state.restTimer - 15 <= 0) {
        state.restTimer = 0;
        state.restTimerActive = false;
        return;
      }
      state.restTimer -= 15;
    },
    decrementRestTimer(state, action) {
      if (action.payload?.amount) {
        const newTimeLeft = state.restTimer - action.payload.amount;
        if (newTimeLeft <= 0) {
          state.restTimerActive = false;
          return;
        }
        state.restTimer = newTimeLeft;
        return;
      }

      //prevents the restTimer from being decreased too fast when switching between minized rest timer view
      if (Date.now() - state.lastDecrent < 800) {
        return;
      }
      state.lastDecrent = Date.now();
      state.restTimer -= 1;
      if (state.restTimer <= 0) {
        state.restTimerActive = false;
        return;
      }
    },

    setRestTimer(state, action) {
      state.restTimer = action.payload;
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
export const setRestTimer = restTimerSlice.actions.setRestTimer;
export const updateAndMinimizeRestTimer =
  restTimerSlice.actions.updateAndMinimizeRestTimer;
export const incrementRestTimer = restTimerSlice.actions.incrementRestTimerBy15;
export const decrementRestTimerBy15 =
  restTimerSlice.actions.decrementRestTimerBy15;
export const decrementRestTimer = restTimerSlice.actions.decrementRestTimer;
export const setSavedRestTimer = restTimerSlice.actions.setSavedRestTimer;
export const setTimeClosed = restTimerSlice.actions.setTimeClosed;

export default restTimerSlice.reducer;
