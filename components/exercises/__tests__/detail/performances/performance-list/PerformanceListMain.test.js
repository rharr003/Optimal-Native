import { render, screen } from "@testing-library/react-native";
import PerformanceListMain from "../../../../detail/performances/performance-list/PerformanceListMain";

describe("Main performance list", () => {
  const data = {
    labels: [],
    datasets: [
      { data: [0], withDots: false },
      { data: [300], withDots: false },
    ],
    legend: [],
  };
  const equipment = "barbell";
  const thirdColumnName = "1RM";
  it("renders without crashing", () => {
    render(
      <PerformanceListMain
        data={data}
        equipment={equipment}
        thirdColumnName={thirdColumnName}
      />
    );

    expect(screen.getByText(thirdColumnName)).toBeDefined();
  });
});
