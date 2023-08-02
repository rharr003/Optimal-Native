export const formatTime = (time) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  const result =
    Math.floor(time / 3600) > 0
      ? `${getHours} : ${getMinutes} : ${getSeconds}`
      : `${getMinutes} : ${getSeconds}`;
  return result;
};
