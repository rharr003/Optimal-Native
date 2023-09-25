import { Text, View, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useWindowDimensions } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import ChartFilter from "./ChartFilter";
import { createChartDataObj } from "../../../util/chart/formatWeightData";

export default function Chart({
  metricData,
  hiddenIndexes,
  setIndexesToHide,
  setMetricData,
  setCurrFormat,
}) {
  const windowWidth = useWindowDimensions().width;
  const data = createChartDataObj(metricData);

  const chartConfig = {
    backgroundGradientFrom: "#01ffe6",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#004b42",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => "#80fdf1",
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      fillOpacity: 0,
      strokeOpacity: 0.5,
    },
    decimalPlaces: 1,
  };

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <LineChart
        data={data}
        width={windowWidth - 40}
        height={240}
        chartConfig={chartConfig}
        hidePointsAtIndex={hiddenIndexes}
        withVerticalLines={false}
        withHorizontalLabels={metricData.length > 0 ? true : false}
      />

      {!metricData.length && (
        <View style={styles.chartOverlay}>
          <Text style={[styles.chartOverlayText, styles.italic]}>
            No Data For Period Selected
          </Text>
        </View>
      )}
      <ChartFilter
        setCurrFormat={setCurrFormat}
        setIndexesToHide={setIndexesToHide}
        setMetricData={setMetricData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",

    justifyContent: "center",
    backgroundColor: ColorPalette.dark.gray900,
    opacity: 0.7,
  },

  chartOverlayText: {
    color: ColorPalette.dark.secondary200,

    fontSize: 20,
  },
  italic: {
    fontStyle: "italic",

    color: ColorPalette.dark.gray500,
  },
});
