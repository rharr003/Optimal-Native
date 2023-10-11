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

export function parseHeight(height) {
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return `${feet} ft. ${inches} in.`;
}

export const heightOptions = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
  67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
  86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
].map((val) => ({
  label: parseHeight(val),
  color: "#FFFFFF",
  value: val,
}));
