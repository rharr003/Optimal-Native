import { parseDate } from "../formatWeightData";
import { buildWeekArray } from "../buildWeekArray";

function calculateVolume(set) {
  if (set.unit === "lbs") {
    return set.reps * set.weight;
  } else {
    return set.reps * set.weight * 0.453592;
  }
}

export function formatWeeklyVolume(data, start, end) {
  let weeks = buildWeekArray(start, end);
  for (let i = 0; i < data.length; i++) {
    const currDate = parseDate(data[i].date);
    for (let j = 0; j < weeks.length; j++) {
      if (currDate >= weeks[j].startDate && currDate <= weeks[j].endDate) {
        weeks[j].total += calculateVolume(data[i]);
        weeks[j].numDatapoints++;
        break;
      }
    }
  }

  const formatted = weeks.map((week) => {
    return {
      label: week.label,
      totalVolume: week.total.toFixed(0),
    };
  });

  return formatted.slice(1);
}

export function buildChartDataObj(weeklyVolumeData) {
  if (!weeklyVolumeData.length) {
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
    labels: weeklyVolumeData.map((item) => item.label),
    datasets: [
      {
        data: weeklyVolumeData.map((item) => item.totalVolume),
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
