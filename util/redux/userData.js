import { createSlice } from "@reduxjs/toolkit";

let interval = null;

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    tdee: 0,
    currentIntake: 0,
    overlayMessage: "",
  },
  reducers: {
    setTdee(state, action) {
      state.tdee = action.payload;
    },

    setCurrentIntake(state, action) {
      state.currentIntake = action.payload;
    },

    setOverlayMessage(state, action) {
      state.overlayMessage = action.payload;
    },
  },
});

export const { setTdee, setCurrentIntake, setOverlayMessage } =
  userDataSlice.actions;

export default userDataSlice.reducer;
