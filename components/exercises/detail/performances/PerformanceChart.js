import { View, StyleSheet } from "react-native";
import LineChart from "../../../shared/line-chart/LineChart";
import { chartConfig } from "../../../../util/chart/exercises/performanceChart";

export default function PerformanceChart({ title, data }) {
  return (
    <View style={styles.container}>
      <LineChart
        title={title}
        data={data}
        chartConfig={chartConfig}
        withFilterButton={false}
        emptyDataText="Not Enough Recent Data"
        hideHorizontalLabels={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 260, justifyContent: "center", alignItems: "center" },
});
