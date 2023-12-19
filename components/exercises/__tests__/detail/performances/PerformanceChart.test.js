import { render } from "@testing-library/react-native";
import PerformanceChart from "../../../detail/performances/PerformanceChart";

describe("Exercise Detail Performance Chart", () => {
  const title = "test";
  const data = {
    labels: [],
    datasets: [
      { data: [0], withDots: false },
      { data: [300], withDots: false },
    ],
    legend: [],
  };
  it("renders without crashing", () => {
    render(<PerformanceChart title={title} data={data} />);
  });
});
