export const formatEnUsDate = (date) => {
  const originalDate = new Date(date);

  // const UTCDate = new Date(
  //   Date.UTC(
  //     originalDate.getFullYear(),
  //     originalDate.getMonth(),
  //     originalDate.getDate()
  //   )
  // );

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(originalDate)
    .replace(/\//g, "-");
};

export const formatEnUsDateTime = (date) => {
  const originalDate = new Date(date);

  // const UTCDate = new Date(
  //   Date.UTC(
  //     originalDate.getFullYear(),
  //     originalDate.getMonth(),
  //     originalDate.getDate()
  //   )
  // );

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(originalDate)
    .replace(/\//g, "-");
};

export const formatDateForInput = (date) =>
  date && new Date(date).toISOString().split("T")[0];


export function isValidDate(dateString) {
  const date = new Date(dateString);

  return !isNaN(date.valueOf());
}