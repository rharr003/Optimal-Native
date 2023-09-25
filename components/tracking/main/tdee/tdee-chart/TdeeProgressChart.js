import { ProgressChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { useWindowDimensions } from "react-native";
import {
  chartConfig,
  buildChartDataObj,
} from "../../../../../util/chart/tracking/tdee";

export default function TdeeProgressChart() {
  const tdee = useSelector((state) => state.userData.tdee);
  const currentIntake = useSelector((state) => state.userData.currentIntake);
  const data = buildChartDataObj(currentIntake, tdee);
  const { width } = useWindowDimensions();

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
