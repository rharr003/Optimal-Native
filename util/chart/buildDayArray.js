function parseDate(dateString) {
  const dateParts = dateString.split("-");

  return new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2])
  );
}

export function buildDayArray(start, end) {
  const days = [];
  let currDay = parseDate(start);
  const lastDay = parseDate(end);

  while (currDay <= lastDay) {
    const day = {
      label: currDay.toLocaleString("default", {
        month: "numeric",
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
