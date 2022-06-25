const DB = require("../models/DB");
const RegistrationModel = require("../models/Registration");
const SubjectModel = require("../models/Subject");
const ScheduleModel = require("../models/Schedule");
const UserModel = require("../models/User");

const { markedToday } = require("./Attendance.controller");
const { generateScheduleDates, dayToIndex } = require("../helpers/dates");

const getValidRegistrations = async (idStudent) => {
  try {
    await DB.authenticate();
    console.log("---------> Dabatase connected");
    return RegistrationModel.findAll({
      where: {
        id_user: idStudent,
        validated: true,
      },
      include: [
        {
          model: SubjectModel,
          as: "RegistrationToSubject",
          include: [{ model: ScheduleModel, as: "Schedules" }],
        },
      ],
    });
  } catch (err) {
    console.log(
      "---------> Unable to connect to database to get student registrations",
      err
    );
  }
};

const getAllInvalidRegistrations = async (idSubject) => {
  try {
    await DB.authenticate();
    console.log("---------> Dabatase connected");
    return RegistrationModel.findAll({
      where: {
        id_subject: idSubject,
        validated: false,
      },
      include: [
        {
          model: SubjectModel,
          as: "RegistrationToSubject",
          include: [{ model: ScheduleModel, as: "Schedules" }],
        },
      ],
    });
  } catch (err) {
    console.log(
      "---------> Unable to connect to database to get students requests ",
      err
    );
  }
};

const getAllValidRegistrations = async (idStudent) => {
  try {
    await DB.authenticate();
    console.log("---------> Dabatase connected");
    return RegistrationModel.findAll({
      where: {
        validated: true,
      },
      include: [
        {
          model: UserModel,
          as: "RegistrationOfUser",
        },
        {
          model: SubjectModel,
          as: "RegistrationToSubject",
          include: [{ model: ScheduleModel, as: "Schedules" }],
        },
      ],
    });
  } catch (err) {
    console.log(
      "---------> Unable to connect to database to get all valid registrations",
      err
    );
  }
};

const splitSubjects = async (registrations) => {
  const activeSubjects = [];
  const inactiveSubjects = [];
  await registrations.map(async (reg) => {
    const alreadyMarkedToday = await markedToday(reg.id);
    reg.RegistrationToSubject.Schedules.map((sc) => {
      const [dateStart, dateEnd] = generateScheduleDates(sc);

      if (
        new Date(Date.now()) >= dateStart &&
        new Date(Date.now()) <= dateEnd &&
        !alreadyMarkedToday &&
        dayToIndex(sc.dayOfWeek) === new Date(Date.now()).getDay()
      ) {
        activeSubjects.push({
          ...reg.RegistrationToSubject,
          startHour: sc.startAt,
        });
        return;
      } else {
        console.log("**************ENTRÓ AL EL*****************");
        inactiveSubjects.push(reg.RegistrationToSubject);
      }
    });
  });

  console.log("pasó por fuera");

  return { activeSubjects, inactiveSubjects };
};

const getActiveSubjects = (registrations) => {
  return registrations.map(async (reg) => {
    console.log("antes del marked");
    const alreadyMarkedToday = await markedToday(reg.id);
    console.log("despues del marked");

    reg.RegistrationToSubject.Schedules.map((sc) => {
      const [dateStart, dateEnd] = generateScheduleDates(sc);

      console.log("adentro");
      if (
        new Date(Date.now()) >= dateStart &&
        new Date(Date.now()) <= dateEnd &&
        !alreadyMarkedToday &&
        dayToIndex(sc.dayOfWeek) === new Date(Date.now()).getDay()
      )
        return {
          ...reg.RegistrationToSubject,
          startHour: sc.startAt,
        };
    });
  });
};

module.exports = {
  getValidRegistrations,
  getAllInvalidRegistrations,
  getAllValidRegistrations,
  splitSubjects,
  getActiveSubjects,
};
