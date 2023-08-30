export function smoothEmptyData(data) {
  const indexesToHideOnChart = [];
  let smoothedData = [];
  let lastNonZeroIndex = 0;
  let lastValidValue = 0;
  let nextValidValue = 0;
  let numBetweenValid = 0;

  //loop through data to find any empty datapoints and smooth them out.
  //if the first datapoint is empty, skip it
  //hide index on chart so the smoothed data point doesnt appear as a user input but the line is still continuous

  for (let i = 0; i < data.length; i++) {
    if (data[i].numDatapoints === 0 && lastNonZeroIndex === 0) {
      continue;
    } else if (data[i].numDatapoints === 0 && i === data.length - 1) {
      continue;
    } else if (data[i].numDatapoints === 0) {
      indexesToHideOnChart.push(smoothedData.length);
      let currIndex = i;
      while (data[currIndex].numDatapoints === 0) {
        currIndex++;
      }
      if (currIndex === data.length) {
        break;
      }

      nextValidValue = data[currIndex].average;
      numBetweenValid = currIndex - lastNonZeroIndex;
      const totalDiff = nextValidValue - lastValidValue;
      const increment = totalDiff / numBetweenValid;
      const currAvg = (lastValidValue + increment).toFixed(1);

      smoothedData.push({
        ...data[i],
        average: currAvg,
      });
      lastValidValue = parseFloat(currAvg);
      lastNonZeroIndex = i;
    } else {
      lastNonZeroIndex = i;
      lastValidTotal = data[i].total;
      lastValidNumDatapoints = data[i].numDatapoints;
      lastValidValue = parseFloat(data[i].average);
      smoothedData.push(data[i]);
    }
  }
  if (smoothedData.length === 0) {
    return [[], []];
  }
  smoothedData = smoothedData.map((d) => {
    return {
      average: d.average,
      label: d.label,
    };
  });

  return [smoothedData, indexesToHideOnChart];
}
