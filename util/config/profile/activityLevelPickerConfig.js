import { ColorPalette } from "../../../ColorPalette";

export const pickerStyle = {
  modalViewBottom: {
    backgroundColor: ColorPalette.dark.gray700,
  },
  modalViewMiddle: {
    borderTopWidth: 0,
    backgroundColor: ColorPalette.dark.gray700,
  },
  done: {
    color: ColorPalette.dark.secondary200,
  },
  chevron: {
    display: "none",
  },
};

export const activityLevelOptions = [
  "Little to no exercise",
  "Light exercise 1-3 days/week",
  "Moderate exercise 3-5 days/week",
  "Hard exercise 6-7 days/week",
].map((val) => ({
  label: val,
  color: "#FFFFFF",
  value: val,
}));
