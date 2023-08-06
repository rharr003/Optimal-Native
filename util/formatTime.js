export const formatTime = (time) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes =
    `${minutes % 60}`.length === 1 ? `0${minutes % 60}` : minutes % 60;
  const getHours = `${Math.floor(time / 3600)}`;
  const result =
    Math.floor(time / 3600) > 0
      ? `${getHours} : ${getMinutes} : ${getSeconds}`
      : `${getMinutes} : ${getSeconds}`;
  return result;
};
