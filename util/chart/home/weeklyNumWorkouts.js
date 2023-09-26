import { parseDate } from "../tracking/formatWeightData";
import { buildWeekArray } from "../buildWeekArray";

export function formatWeeklyNumWorkouts(data, start, end) {
  let weeks = buildWeekArray(start, end);
  for (let i = 0; i < data.length; i++) {
    const currDate = parseDate(data[i].date);
    for (let j = 0; j < weeks.length; j++) {
      if (currDate >= weeks[j].startDate && currDate <= weeks[j].endDate) {
        weeks[j].total++;
        break;
      }
    }
  }

  const formatted = weeks.map((week) => {
    return {
      label: week.label,
      total: week.total,
    };
  });

  return formatted.slice(1);
}

export function buildChartDataObj(weeklyNumWorkoutsData) {
  if (!weeklyNumWorkoutsData.length) {
    return {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
      legend: [],
    };
  }
  const data = {
    labels: weeklyNumWorkoutsData.map((item) => item.label),
    datasets: [
      {
        data: weeklyNumWorkoutsData.map((item) => item.total),
      },
    ],
  };

  return data;
}

export const chartConfig = {
  backgroundGradientFrom: "#01ffe6",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#004b42",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => "#80fdf1",
  strokeWidth: 2,
  barPercentage: 1,
  useShadowColorFromDataset: false,
  propsForBackgroundLines: {
    fillOpacity: 0,
    strokeOpacity: 0.7,
  },
  decimalPlaces: 0,
};
