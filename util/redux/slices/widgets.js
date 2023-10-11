import { createSlice } from "@reduxjs/toolkit";
import { getCurrWeekMonday } from "../../chart/getMondayAndSunday";
import { abbreviateNum } from "../../sqlite/abbreviateNum";
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

    updateAfterWorkout(state, action) {
      const matchingLabel = getCurrWeekMonday(new Date()).toLocaleString(
        "default",
        {
          month: "numeric",
          day: "numeric",
          timeZone: "UTC",
        }
      );
      state.numWorkoutsLastSixWeeksData = state.numWorkoutsLastSixWeeksData.map(
        (week) => {
          if (week.label === matchingLabel) {
            return {
              ...week,
              total: week.total + 1,
            };
          }
          return week;
        }
      );

      state.weeklyVolumeLastSixWeeksData =
        state.weeklyVolumeLastSixWeeksData.map((week) => {
          if (week.label === matchingLabel) {
            return {
              ...week,
              totalVolume:
                parseInt(week.totalVolume) + parseInt(action.payload.volume),
            };
          }
          return week;
        });
      state.totalNumWorkouts += 1;
      state.totalTime += action.payload.duration;
      state.totalVolume = (
        parseInt(state.totalVolume) + parseInt(action.payload.volume)
      ).toFixed(0);
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
export const { updateAfterWorkout } = widgetSlice.actions;
export default widgetSlice.reducer;
