export function getDateObj(DBDate: Date | string) {
  const date = new Date(DBDate);
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = weekDay[date.getDay()];
  const dateNum = date.getDate();
  const month = date.getMonth();
  const monthName = monthNames[month];
  const adjustedMonth = month + 1;
  const monthNum =
    adjustedMonth.toString().length === 1 ? `0${adjustedMonth}` : adjustedMonth;
  const year = date.getFullYear();
  const originalHour = date.getHours();
  const hour =
    originalHour.toString().length === 1 ? `0${originalHour}` : originalHour;
  const minute = date.getMinutes();

  return {
    day,
    dateNum,
    monthNum,
    monthName,
    year,
    hour,
    minute,
  };
}
