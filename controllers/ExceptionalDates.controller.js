const DB = require("../models/DB");
const { getAttendancesInfo } = require("./Attendance.controller");
const { getStudentsInfo } = require("./Professor.controller");
const { getSubjectInfo } = require("./Subject.controller");
const { getAllMonths, indexToDate } = require("../helpers/dates");

const addExceptionalDate = async (req, res, next) => {
  const idProfessor = req.session.idUser;
  const idSubject = req.params.id;
  const { day, month } = req.body;

  console.log(day, month);
  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");

    const subject = await getSubjectInfo(idSubject, idProfessor);
    const horaries = subject.Schedules;

    const validDays = new Set();
    horaries.map((h) => {
      validDays.add(h.dayOfWeek);
    });

    const months = getAllMonths();
    const validMonths = months.map((m) => {
      const validMonth = [];
      m.map((d) => {
        if (validDays.has(indexToDate(d.getDay()))) {
          validMonth.push(d);
        }
      });
      return validMonth;
    });

    // console.log(validMonths[6]);
    // console.log(validMonths[month - 1].some((d) => d.getDate() == day));

    if (!validMonths[month - 1].some((d) => d.getDate() == day))
      return res.status(404).send();

    return res.status(201).send();
  } catch (err) {
    console.log("Unable to connect to database to get attendances " + err);
  }
};

module.exports = {
  addExceptionalDate,
};
