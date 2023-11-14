export const pickerStyle = {
  inputAndroid: {
    backgroundColor: "blue",
  },
};

export const bodyPartOptions = [
  "Any",
  "Abs",
  "Back",
  "Biceps",
  "Chest",
  "Legs",
  "Shoulders",
  "Triceps",
].map((val) => ({
  label: val,
  color: "#000000",
  value: val,
}));
