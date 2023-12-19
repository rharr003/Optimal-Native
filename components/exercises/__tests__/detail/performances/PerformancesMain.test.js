import { render } from "@testing-library/react-native";
import PerformancesMain from "../../../detail/performances/PerformancesMain";

describe("Performances Main", () => {
  const title = "test";
  const chartData = {
    labels: [],
    datasets: [
      { data: [0], withDots: false },
      { data: [300], withDots: false },
    ],
    legend: [],
  };
  const performanceListData = [];
  const equipment = "barbell";
  const thirdColumnName = "1RM";

  it("renders without crashing", () => {
    render(
      <PerformancesMain
        thirdColumnName={thirdColumnName}
        equipment={equipment}
        performanceListData={performanceListData}
        chartData={chartData}
        title={title}
      />
    );
  });
});
