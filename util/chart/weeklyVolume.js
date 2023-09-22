import { parseDate } from "./formatWeightData";
import { buildWeekArray } from "./buildWeekArray";

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
