import { ColorPalette } from "../../ColorPalette";
export function createChartDataObjExercise(data) {
  if (!data?.length) {
    return {
      labels: [],
      datasets: [
        { data: [0], withDots: false },
        { data: [300], withDots: false },
      ],
      legend: [],
    };
  }
  function calculateSpacingInterval() {
    if (!data?.length || data.length < 5) return 1;
    return Math.floor(data.length / 5);
  }

  const spacingInterval = calculateSpacingInterval();

  const chartLabels = data.map((m, i) => {
    if (i % spacingInterval === 0) {
      return new Date(m.date).toLocaleDateString("default", {
        month: "short",
        day: "numeric",
      });
    }
    return "";
  });

  if (data.length < 2) {
    return {
      labels: [],
      datasets: [
        { data: [0], withDots: false },
        { data: [300], withDots: false },
      ],
      legend: [],
    };
  }
  // creates the minimum and maximum data points for the chart so there is some padding
  const minData = data.map((m) => m.value).sort((a, b) => a - b)[0];

  const maxData = data.map((m) => m.value).sort((a, b) => b - a)[0];

  const formattedData = {
    labels: chartLabels,
    datasets: [
      {
        data: data.map((m) => m.value),

        color: (opacity = 1) => ColorPalette.dark.secondary200,
        strokeWidth: 2,
        withDots: false,
      },
      {
        data: [Math.max(minData - 5, 0)],
        withDots: false,
      },
      {
        data: [parseFloat(maxData) + 5],
        withDots: false,
      },
    ],

    legend: [],
  };

  return formattedData;
}
