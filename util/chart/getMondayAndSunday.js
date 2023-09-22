export function getCurrWeekMonday(date) {
  const day = date.getUTCDay();
  if (day === 1) return date;
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const result = new Date(date);
  result.setDate(diff);

  return result;
}

export function getCurrWeekUpcomingSunday(date) {
  if (date.getUTCDay() === 0) return date;
  const day = date.getUTCDay();
  const diff = date.getDate() + (7 - day);

  const result = new Date(date);

  return new Date(result.setDate(diff));
}
