import { ColorPalette } from "../../../ColorPalette";
export function buildChartDataObj(currentIntake, tdee) {
  const weightLoss = Math.min((currentIntake / (tdee - 500)).toFixed(2), 1);
  const maintenance = Math.min((currentIntake / tdee).toFixed(2), 1);
  const weightGain = Math.min((currentIntake / (tdee + 400)).toFixed(2), 1);
  const data = {
    labels: ["Weight Loss", "Maintenance", "Weight Gain"],
    data: [
      tdee ? weightLoss : 0,
      tdee ? maintenance : 0,
      tdee ? weightGain : 0,
    ],
    colors: [
      ColorPalette.dark.error,
      ColorPalette.dark.secondary200,
      ColorPalette.dark.primary200,
    ],
  };
  return data;
}

export const chartConfig = {
  backgroundGradientFrom: "transparent",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "transparent",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1, index) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};
