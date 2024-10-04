export const timeDiff = (start: Date, end: Date) => {
  let diff = end.getTime() - start.getTime();
  let hours = Math.floor(diff / 1000 / 60 / 60);
  let minutes = Math.floor((diff - hours * 1000 * 60 * 60) / 1000 / 60);
  let seconds = Math.floor(
    (diff - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000
  );
  return { hours, minutes, seconds };
};

export const datetime = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
