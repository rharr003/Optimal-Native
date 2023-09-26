import { LineChart as LineChartCK } from "react-native-chart-kit";
import { Dimensions, View, StyleSheet } from "react-native";
import {
  createChartDataObj,
  chartConfig,
} from "../../../../../util/chart/tracking/formatWeightData";

export default function LineChart({
  rawData,
  hiddenIndexes,
  withHorizontalLabels,
}) {
  const data = createChartDataObj(rawData);
  const windowWidth = Dimensions.get("window").width - 20;
  const offset = rawData.length > 0 ? -10 : -30;

  return (
    <View style={[styles.container, { marginLeft: offset }]}>
      <LineChartCK
        data={data}
        width={windowWidth}
        height={240}
        chartConfig={chartConfig}
        hidePointsAtIndex={hiddenIndexes}
        withVerticalLines={false}
        withHorizontalLabels={withHorizontalLabels}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
