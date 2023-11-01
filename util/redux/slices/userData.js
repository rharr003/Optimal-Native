import { createSlice } from "@reduxjs/toolkit";
import { ColorPalette } from "../../../ColorPalette";

let interval = null;

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    tdee: 0,
    currentIntake: 0,
    currentPacing: "",
    currentWeight: {
      weight: 0,
      date: null,
    },
    currentBmi: 0,
    overlayMessage: "",
    weightMeasurements: [],
    calorieColor: ColorPalette.dark.gray400,
  },
  reducers: {
    setTdee(state, action) {
      state.tdee = action.payload;
    },

    setCurrentIntake(state, action) {
      state.currentIntake = action.payload;
    },

    updatePacing(state, action) {
      if (!state.currentIntake || !state.tdee) {
        (state.currentPacing = ""),
          (state.calorieColor = ColorPalette.dark.gray400);
        return;
      }
      const result = parseFloat(
        (((state.currentIntake - state.tdee) * 7) / 3500).toFixed(1)
      );
      state.currentPacing = result;
      if (result > 0) state.calorieColor = ColorPalette.dark.primary200;
      else if (result < 0) state.calorieColor = ColorPalette.dark.error;
      else state.calorieColor = ColorPalette.dark.secondary200;
    },

    setOverlayMessage(state, action) {
      state.overlayMessage = action.payload;
    },

    setWeightMeasurements(state, action) {
      state.weightMeasurements = action.payload;
      console.log(action.payload);
    },

    addWeightMeasurement(state, action) {
      const newMeasurements = [
        ...state.weightMeasurements,
        action.payload,
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
      state.weightMeasurements = newMeasurements;
    },

    deleteWeightMeasurement(state, action) {
      const index = action.payload;
      state.weightMeasurements.splice(index, 1);
    },

    updateWeight(state, action) {
      if (!action.payload) {
        (state.currentBmi = 0),
          (state.currentWeight = {
            weight: 0,
            date: null,
          });
        return;
      }
      state.currentWeight = {
        weight: action.payload.weight,
        date: action.payload.date,
      };
      if (action.payload.height) {
        state.currentBmi = parseFloat(
          (
            (action.payload.weight /
              (parseInt(action.payload.height) *
                parseInt(action.payload.height))) *
            703
          ).toFixed(1)
        );
      }
    },
  },
});

export const {
  setTdee,
  setCurrentIntake,
  setOverlayMessage,
  setWeightMeasurements,
  addWeightMeasurement,
  deleteWeightMeasurement,
  updateWeight,
  updatePacing,
} = userDataSlice.actions;

export default userDataSlice.reducer;
