import { createSlice } from "@reduxjs/toolkit";

const widgetSlice = createSlice({
  name: "widgets",
  initialState: {
    widgetList: [],
    totalNumWorkouts: 0,
    totalVolume: 0,
    totalTime: 0,
    numWorkoutsLastSixWeeksData: [{ total: 0, label: "" }],
    weeklyVolumeLastSixWeeksData: [{ totalVolume: 0, label: "" }],
  },

  reducers: {
    initializeWidgetList(state, action) {
      state.widgetList = action.payload;
    },

    toggleWidgetVisible(state, action) {
      const widget = state.widgetList.find(
        (widget) => widget.id === action.payload.id
      );
      widget.shouldDisplay = !widget.shouldDisplay;
    },

    setTotalNumWorkouts(state, action) {
      state.totalNumWorkouts = action.payload;
    },

    incrementTotalNumWorkouts(state) {
      state.totalNumWorkouts++;
    },

    setTotalVolume(state, action) {
      state.totalVolume = action.payload;
    },

    incrementTotalVolume(state, action) {
      state.totalVolume += action.payload;
    },

    setTotalTime(state, action) {
      state.totalTime = action.payload;
    },

    incrementTotalTime(state, action) {
      state.totalTime += action.payload;
    },

    setNumWorkoutsLastSixWeeksData(state, action) {
      state.numWorkoutsLastSixWeeksData = action.payload;
    },

    setWeeklyVolumeLastSixWeeksData(state, action) {
      state.weeklyVolumeLastSixWeeksData = action.payload;
    },
  },
});

export const { initializeWidgetList } = widgetSlice.actions;
export const { toggleWidgetVisible } = widgetSlice.actions;
export const { setTotalNumWorkouts } = widgetSlice.actions;
export const { incrementTotalNumWorkouts } = widgetSlice.actions;
export const { setTotalVolume } = widgetSlice.actions;
export const { incrementTotalVolume } = widgetSlice.actions;
export const { setTotalTime } = widgetSlice.actions;
export const { incrementTotalTime } = widgetSlice.actions;
export const { setNumWorkoutsLastSixWeeksData } = widgetSlice.actions;
export const { setWeeklyVolumeLastSixWeeksData } = widgetSlice.actions;
export default widgetSlice.reducer;
