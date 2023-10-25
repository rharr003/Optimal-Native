import { Text, View, StyleSheet, Dimensions } from "react-native";
import { LineChart as RNCKLineChart } from "react-native-chart-kit";
import { useWindowDimensions } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import FilterButtonGroup from "./filter-button-group/FilterButtonGroup";
import PressableOverlay from "../ui/PressableOverlay";

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
  currFormat = "",
}) {
  const chartWidth = Dimensions.get("window").width - 40;
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.chartContainer}>
        <RNCKLineChart
          data={data}
          width={chartWidth}
          height={240}
          chartConfig={chartConfig}
          hidePointsAtIndex={hiddenIndexes.length > 0 ? hiddenIndexes : []}
          withVerticalLines={false}
          withHorizontalLabels={!hideHorizontalLabels}
        />
      </View>
      {/* data contains only placeholder data if datasets length is less than 3 */}
      {data.datasets.length < 3 && (
        <PressableOverlay message={emptyDataText} opacity={0.8} />
      )}

      {withFilterButton && (
        <FilterButtonGroup
          currFormat={currFormat}
          filterOptions={filterOptions}
          onFilterChange={onFilterChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 270,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: ColorPalette.dark.secondary200,
    borderWidth: 1,
    borderRadius: 25,
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

  chart: {
    backgroundColor: "blue",
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
