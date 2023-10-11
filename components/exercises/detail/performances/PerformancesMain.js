import PerformanceChart from "./performance-chart/PerformanceChart";
import PerformanceListMain from "./performance-list/PerformanceListMain";

export default function PerformancesMain({
  title,
  chartData,
  performanceListData,
  equipment,
  thirdColumnName,
}) {
  return (
    <>
      <PerformanceChart title={title} data={chartData} />
      <PerformanceListMain
        data={performanceListData}
        equipment={equipment}
        thirdColumnName={thirdColumnName}
      />
    </>
  );
}
