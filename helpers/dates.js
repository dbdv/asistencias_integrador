const days = {
  1: "Lunes",
  2: "Martes",
  3: "Miercoles",
  4: "Jueves",
  5: "Viernes",
};
const indexs = {
  Lunes: 1,
  Martes: 2,
  Miercoles: 3,
  Jueves: 4,
  Viernes: 5,
};

const dayToIndex = (day) => indexs[day];

const indexToDate = (day) => days[day];
const currentTimeToString = () =>
  `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`;

function generateScheduleDates(schedule) {
  const dateStart = new Date(
    new Date(Date.now()).getFullYear(),
    new Date(Date.now()).getMonth(),
    new Date(Date.now()).getDate(),
    schedule.startAt.split(":")[0],
    schedule.startAt.split(":")[1]
  );

  const dateEnd = new Date(
    new Date(Date.now()).getFullYear(),
    new Date(Date.now()).getMonth(),
    new Date(Date.now()).getDate(),
    schedule.startAt.split(":")[0],
    schedule.startAt.split(":")[1] + 30
  );

  return [dateStart, dateEnd];
}

module.exports = {
  dayToIndex,
  indexToDate,
  currentTimeToString,
  generateScheduleDates,
};
