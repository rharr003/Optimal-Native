export const formatTime = (time, asText = false) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes =
    `${minutes % 60}`.length === 1 && !asText
      ? `0${minutes % 60}`
      : minutes % 60;
  const getHours = `${Math.floor(time / 3600)}`;
  if (asText) {
    const result =
      Math.floor(time / 3600) > 0
        ? `${getHours}h ${getMinutes}m`
        : `${getMinutes}m ${getSeconds}s`;
    return result;
  }
  const result =
    Math.floor(time / 3600) > 0
      ? `${getHours} : ${getMinutes} : ${getSeconds}`
      : `${getMinutes} : ${getSeconds}`;
  return result;
};
