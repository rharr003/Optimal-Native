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

export const genderOptions = ["Male", "Female"].map((val) => ({
  label: val,
  color: "#FFFFFF",
  value: val,
}));
