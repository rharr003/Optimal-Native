import { ProgressChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { useWindowDimensions } from "react-native";
import {
  chartConfig,
  buildChartDataObj,
} from "../../../../../util/chart/tracking/tdee";

export default function TdeeChartMain() {
  const tdee = useSelector((state) => state.userData.tdee);
  const currentIntake = useSelector((state) => state.userData.currentIntake);
  const data = buildChartDataObj(currentIntake, tdee);
  const { width } = useWindowDimensions();

  return (
    <ProgressChart
      data={data}
      width={Math.floor(width / 2.3)}
      height={Math.floor(width / 2.3)}
      strokeWidth={15}
      radius={Math.floor(width / 10)}
      chartConfig={chartConfig}
      hideLegend={true}
      withCustomBarColorFromData={true}
      style={{ width: "50%" }}
    />
  );
}
