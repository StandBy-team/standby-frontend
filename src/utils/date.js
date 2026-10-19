const pad = (n) => String(n).padStart(2, "0");

/** Local date as "YYYY-MM-DD". */
export const toDateValue = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const today = () => toDateValue(new Date());

export const addMonths = (value, months) => {
  const date = new Date(`${value}T00:00:00`);
  date.setMonth(date.getMonth() + months);
  return toDateValue(date);
};

/** "2026-07-06" -> "2026.07.06" */
export const dotDate = (value) => value.replaceAll("-", ".");

/** One day or "start ~ end" in dotted form. */
export const formatPeriod = (start, end) => (start === end ? dotDate(start) : `${dotDate(start)} ~ ${dotDate(end)}`);
