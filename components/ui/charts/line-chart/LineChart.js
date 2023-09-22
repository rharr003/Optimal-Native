import { Text, View, StyleSheet } from "react-native";
import { LineChart as RNCKLineChart } from "react-native-chart-kit";
import { useWindowDimensions } from "react-native";
import { ColorPalette } from "../../ColorPalette";
import LineChartFilterButton from "./LineChartFilterButton";

export default function LineChart({
  data,
  chartConfig,
  hideHorizontalLabels = false,
  hiddenIndexes = [],
  filterOptions = [],
  onFilterChange = null,
  withFilterButton = true,
  emptyDataText = "No Data For Period Selected",
  title = "",
}) {
  const windowWidth = useWindowDimensions().width;
  const offset = data.datasets.length > 0 ? -35 : -50;
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.chartContainer, { marginLeft: offset }]}>
        <RNCKLineChart
          data={data}
          width={windowWidth - 10}
          height={240}
          chartConfig={chartConfig}
          hidePointsAtIndex={hiddenIndexes.length > 0 ? hiddenIndexes : []}
          withVerticalLines={false}
          withHorizontalLabels={!hideHorizontalLabels}
        />
        {!data.datasets.length && (
          <View style={styles.chartOverlay}>
            <Text style={[styles.chartOverlayText, styles.italic]}>
              {emptyDataText}
            </Text>
          </View>
        )}
      </View>

      {withFilterButton && (
        <LineChartFilterButton
          filterOptions={filterOptions}
          onFilterChange={onFilterChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    width: "100%",
    height: "100%",
  },
  chartOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "105%",
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
    marginBottom: -35,
  },
});
