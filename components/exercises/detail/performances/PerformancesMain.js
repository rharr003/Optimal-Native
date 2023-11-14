import PerformanceChart from "./PerformanceChart";
import PerformanceListMain from "./performance-list/PerformanceListMain";
import { View, StyleSheet } from "react-native";

export default function PerformancesMain({
  title,
  chartData,
  performanceListData,
  equipment,
  thirdColumnName,
}) {
  return (
    <View style={styles.container}>
      <PerformanceChart title={title} data={chartData} />
      <PerformanceListMain
        data={performanceListData}
        equipment={equipment}
        thirdColumnName={thirdColumnName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});
