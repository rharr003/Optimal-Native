import { ColorPalette } from "../../../ColorPalette";
import { formatTime } from "../../formatTime";
import { Platform } from "react-native";

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

export const restTimeOptions = [
  0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240,
  255, 270, 285, 300,
].map((val) => ({
  label: formatTime(val),
  color: Platform.OS === "ios" ? "#FFFFFF" : "#000000",
  value: val,
}));
