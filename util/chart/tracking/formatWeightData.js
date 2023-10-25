import { smoothEmptyData } from "../smoothEmptyData";
import { ColorPalette } from "../../../ColorPalette";
import { buildWeekArray } from "../buildWeekArray";
import { buildDayArray } from "../buildDayArray";
import { buildMonthArray } from "../buildMonthArray";

export function formatDailyAvg(data, start, end) {
  let days = buildDayArray(start, end);

  for (let i = 0; i < data.length; i++) {
    const currDate = parseDate(data[i].date);
    for (let j = 0; j < days.length; j++) {
      if (currDate.getTime() === days[j].date.getTime()) {
        days[j].total += parseFloat(data[i].value);
        days[j].numDatapoints++;
        break;
      }
    }
  }

  days = days.map((day) => {
    return {
      ...day,
      average: isNaN((day.total / day.numDatapoints).toFixed(1))
        ? 0
        : (day.total / day.numDatapoints).toFixed(1),
    };
  });

  const [normalizedDays, indexesToHide] = smoothEmptyData(days); //

  return [normalizedDays, indexesToHide];
}

export function formatWeeklyAvg(data, start, end) {
  let weeks = buildWeekArray(start, end);

  for (let i = 0; i < data.length; i++) {
    const currDate = parseDate(data[i].date);
    for (let j = 0; j < weeks.length; j++) {
      if (currDate >= weeks[j].startDate && currDate <= weeks[j].endDate) {
        weeks[j].total += parseFloat(data[i].value);
        weeks[j].numDatapoints++;
        break;
      }
    }
  }

  weeks = weeks.map((week) => {
    return {
      ...week,
      average: isNaN((week.total / week.numDatapoints).toFixed(1))
        ? 0
        : (week.total / week.numDatapoints).toFixed(1),
    };
  });

  const [normalizedWeeks, indexesToHide] = smoothEmptyData(weeks);

  return [normalizedWeeks, indexesToHide];
}

export function formatMonthlyAvg(data, start, end) {
  let months = buildMonthArray(start, end);

  for (let i = 0; i < data.length; i++) {
    const currDate = parseDate(data[i].date);
    for (let j = 0; j < months.length; j++) {
      if (currDate >= months[j].startDate && currDate <= months[j].endDate) {
        months[j].total += parseFloat(data[i].value);
        months[j].numDatapoints++;
        break;
      }
    }
  }

  months = months.map((month) => {
    return {
      ...month,
      average: isNaN((month.total / month.numDatapoints).toFixed(1))
        ? 0
        : (month.total / month.numDatapoints).toFixed(1),
    };
  });

  const [normalizedMonths, indexesToHide] = smoothEmptyData(months);

  return [normalizedMonths, indexesToHide];
}

export function parseDate(dateString) {
  const dateParts = dateString.split("-");

  return new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2])
  );
}

export function createChartDataObj(metricData, transparent) {
  // creates the minimum and maximum data points for the chart so there is some padding
  const minData = metricData.map((m) => m.average).sort((a, b) => a - b)[0];

  const maxData = metricData.map((m) => m.average).sort((a, b) => b - a)[0];
  if (!metricData.length) {
    return {
      labels: [],
      datasets: [
        {
          data: [200],
          withDots: false,
        },
        {
          data: [100],
          withDots: false,
        },
      ],
      legend: [],
    };
  }

  const data = {
    labels: metricData.map((m) => m.label),
    datasets: [
      {
        data: metricData.map((m) => m.average),

        color: (opacity = 1) => ColorPalette.dark.secondary200,
        strokeWidth: 2,
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

  return data;
}

export const chartConfig = {
  backgroundGradientFrom: "#01ffe6",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#004b42",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => "#80fdf1",
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForBackgroundLines: {
    fillOpacity: 0,
    strokeOpacity: 0.5,
  },
  decimalPlaces: 1,
};
