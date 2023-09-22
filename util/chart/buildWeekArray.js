import {
  getCurrWeekMonday,
  getCurrWeekUpcomingSunday,
} from "./getMondayAndSunday";

export function buildWeekArray(start, end) {
  const weeks = [];
  let currStartDate = getCurrWeekMonday(start);
  const lastDay = getCurrWeekUpcomingSunday(end);

  while (currStartDate <= lastDay) {
    const start = currStartDate;
    const week = {
      label: currStartDate.toLocaleString("default", {
        month: "numeric",
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
