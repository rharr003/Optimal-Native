import { ProgressChart } from "react-native-chart-kit";
import { ColorPalette } from "../ui/ColorPalette";
import { useSelector } from "react-redux";
import { useWindowDimensions } from "react-native";

export default function TdeeProgressChart({}) {
  const tdee = useSelector((state) => state.userData.tdee);
  const currentIntake = useSelector((state) => state.userData.currentIntake);
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

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "transparent",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1, index) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const { width } = useWindowDimensions();

  // if (!tdee) return null;

  return (
    <ProgressChart
      data={data}
      width={width / 2}
      height={210}
      strokeWidth={16}
      radius={48}
      chartConfig={chartConfig}
      hideLegend={true}
      withCustomBarColorFromData={true}
      style={{ width: "50%" }}
    />
  );
}
