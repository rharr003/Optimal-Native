import { ColorPalette } from "../../../ColorPalette";
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

export const equipmentOptions = [
  "Barbell",
  "Dumbbell",
  "Machine",
  "Cable",
  "Body",
  "Static",
  "Other",
].map((val) => ({
  label: val,
  color: Platform.OS === "ios" ? "#FFFFFF" : "#000000",
  value: val,
}));
