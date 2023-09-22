export function buildMonthArray(start, end) {
  const months = [];
  let currStartDate = new Date(start.getFullYear(), start.getMonth(), 1);
  const lastDay = new Date(end.getFullYear(), end.getMonth() + 1, 0);

  while (currStartDate <= lastDay) {
    const month = {
      label: currStartDate.toLocaleString("default", {
        month: "numeric",
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
