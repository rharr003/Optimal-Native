import { smoothEmptyData } from "./smoothEmptyData";
import { ColorPalette } from "../../components/ui/ColorPalette";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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

export function buildDayArray(start, end) {
  const days = [];
  let currDay = parseDate(start);
  const lastDay = parseDate(end);

  while (currDay <= lastDay) {
    const day = {
      label: currDay.toLocaleString("default", {
        month: "short",
        day: "numeric",
      }),
      date: currDay,
      total: 0,
      numDatapoints: 0,
      average: 0,
    };

    days.push(day);

    currDay = new Date(
      currDay.getFullYear(),
      currDay.getMonth(),
      currDay.getDate() + 1
    );
  }
  return days;
}

export function buildMonthArray(start, end) {
  const months = [];
  let currStartDate = new Date(start.getFullYear(), start.getMonth(), 1);
  const lastDay = new Date(end.getFullYear(), end.getMonth() + 1, 0);

  while (currStartDate <= lastDay) {
    const month = {
      label: currStartDate.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }),
      startDate: currStartDate,
      endDate: new Date(
        currStartDate.getFullYear(),
        currStartDate.getMonth() + 1,
        0
      ),

      total: 0,
      numDatapoints: 0,
      average: 0,
    };

    months.push(month);
    currStartDate = new Date(
      currStartDate.getFullYear(),
      currStartDate.getMonth() + 1,
      1
    );
  }

  return months;
}

export function getCurrWeekMonday(date) {
  const day = date.getUTCDay();
  if (day === 1) return date;
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const result = new Date(date);
  result.setDate(diff);

  return result;
}

export function getCurrWeekUpcomingSunday(date) {
  const day = date.getUTCDay();
  const diff = date.getDate() + (7 - day);

  const result = new Date(date);

  return new Date(result.setDate(diff));
}

export function buildWeekArray(start, end) {
  const weeks = [];
  let currStartDate = getCurrWeekMonday(start);
  const lastDay = getCurrWeekUpcomingSunday(end);

  while (currStartDate <= lastDay) {
    const start = currStartDate;
    const week = {
      label: currStartDate.toLocaleString("default", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),

      startDate: start,
      endDate: new Date(
        new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7)
      ),
      total: 0,
      numDatapoints: 0,
      average: 0,
    };

    weeks.push(week);
    currStartDate = new Date(currStartDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  }
  return weeks;
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
      datasets: [],
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
