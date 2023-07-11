export const datesAndTimes = (flight) => {
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

  const startYear = flight.flightStart.slice(0, 4);
  const endYear = flight.flightEnd.slice(0, 4);
  const startMonth = monthNames[new Date(flight.flightStart).getMonth()];
  const endMonth = monthNames[new Date(flight.flightEnd).getMonth()];
  const startDay =
    flight.flightStart[8] === "0"
      ? flight.flightStart.slice(9, 10)
      : flight.flightStart.slice(8, 10);
  const endDay =
    flight.flightEnd[8] === "0"
      ? flight.flightEnd.slice(9, 10)
      : flight.flightEnd.slice(8, 10);
  const startTime = flight.flightStart.slice(11, 16);
  const endTime = flight.flightEnd.slice(11, 16);
  const duration =
    new Date(flight.flightEnd).getTime() -
    new Date(flight.flightStart).getTime();
  const durationDays = Math.floor(duration / 1000 / 60 / 60 / 24);
  const durationHours = Math.floor(
    (duration - durationDays * 1000 * 60 * 60 * 24) / 1000 / 60 / 60
  );
  return {
    startYear,
    endYear,
    startMonth,
    endMonth,
    startDay,
    endDay,
    startTime,
    endTime,
    duration,
    durationDays,
    durationHours,
  };
};
