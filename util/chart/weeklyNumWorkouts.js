import { parseDate } from "./formatWeightData";
import { buildWeekArray } from "./buildWeekArray";

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
