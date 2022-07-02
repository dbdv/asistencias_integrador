const DB = require("../models/DB");
const UserModel = require("../models/User");
const HoraryModel = require("../models/Schedule");
const ScheduleSubjectModel = require("../models/Schedule-Subject");
const AttendanceModel = require("../models/Attendance");

const { getUser } = require("../controllers/User.controller");
const { encrypt } = require("../helpers/bcrypt");
const {
  getAllInvalidRegistrations,
  getAllValidRegistrations,
  getRegistration,
} = require("./Registration.controller");
const {
  allSubjects,
  getSubjectInfo,
  allSubjectsOfOneProfessors,
} = require("./Subject.controller");
const { findAll } = require("../models/User");
const Registration = require("../models/Registration");

const HOURS = [];
var i, j;
for (i = 8; i < 21; i++) {
  for (j = 0; j < 4; j++) {
    HOURS.push(i + ":" + (j === 0 ? "00" : 15 * j));
  }
}

HOURS.push("21:00");

const getProfessor = async (req, res, next) => {
  const idProfessor = req.session.idUser;

  try {
    await DB.authenticate();
    console.log("---------> Dabatase connected");

    // const registrations = await getAllInvalidRegistrations(idProfessor);
    const professor = await getUser(req.session.email);
    const subjects = await allSubjectsOfOneProfessors(idProfessor);

    return res.render("professors/myCourses", { professor, COURSES: subjects });
  } catch (err) {
    console.log("---------> Unable to connect to database to get student", err);
  }
};

const createProfessor = async (professor) => {
  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");

    let prof = await getUser(professor.email.toLowerCase());

    if (prof) return null;

    return UserModel.create({
      ...professor,
      password: await encrypt(professor.password),
      id_role: 2,
    });
  } catch (err) {
    console.log("Unable to connect to database to create professor" + err);
  }
};

const getSubjectOfProfessor = async (req, res, next) => {
  const subjectId = req.params.id;
  const idProfessor = req.session.idUser;

  const subjectInfo = await getSubjectInfo(subjectId, idProfessor);
  // reg.RegistrationToSubject.Schedules

  console.log("...............");
  console.log(subjectInfo);

  if (!subjectInfo)
    return res.status(404).send({
      mesagge:
        "No se encontró informacion sobre la asocion de esta materia con este profesor",
    });
  const requests = await getAllInvalidRegistrations(subjectInfo.id);
  const students = await getAllValidRegistrations(subjectInfo.id);
  // console.log(requests, students);

  return res.render("professors/course.pug", {
    subject: subjectInfo,
    requests,
    students,
    HOURS_START: HOURS.slice(0, -8),
    HOURS_END: HOURS.slice(8),
  });
};

const deleteStudent = async (req, res, next) => {
  const { idStudent, idSubject } = req.body;
  const registration = await getRegistration(idStudent, idSubject);

  if (!registration) return res.status(404).send();

  await registration.destroy();

  res.status(201).send();
};

const acceptStudent = async (req, res, next) => {
  const { idStudent, idSubject } = req.body;
  const registration = await getRegistration(idStudent, idSubject);

  if (!registration) return res.status(404).send();

  registration.validated = true;

  await registration.save();

  res.status(201).send();
};

const addHorary = async (req, res, next) => {
  const { idSubject, horary } = req.body;

  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");

    const [horaryFromDB, created] = await HoraryModel.findOrCreate({
      where: horary,
      defaults: horary,
    });

    if (!horaryFromDB) return res.status(304).send();

    if (!created) {
      const linked = await ScheduleSubjectModel.findOne({
        where: {
          id_subject: idSubject,
          id_horary: horaryFromDB.id,
        },
      });
      if (linked) return res.status(409).send();
    }

    const link = await ScheduleSubjectModel.create({
      id_subject: idSubject,
      id_horary: horaryFromDB.id,
    });

    if (!link) return res.status(304).send();

    res.status(201).send();
  } catch (err) {
    console.log("Unable to connect to database to create or add horary " + err);
  }
};

const deleteHorary = async (req, res, next) => {
  const { idHorary } = req.body;

  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");

    const link = await ScheduleSubjectModel.findOne({
      where: { id_horary: idHorary },
    });

    if (!link) return res.status(404).send();

    await link.destroy();

    res.status(201).send();
  } catch (err) {
    console.log("Unable to connect to database to create or add horary " + err);
  }
};

const getAttendaces = async (req, res, next) => {
  const idSubject = req.params.id;

  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");

    const subject = await AttendanceModel.findAll({
      include: {
        model: Registration,
        as: "Registration",
        where: {
          id_subject: idSubject,
        },
      },
    });

    return res.render("professors/courseAttendance.pug", {
      subject,
      MONTHS: [],
      STUDENTS: [],
    });
  } catch (err) {
    console.log("Unable to connect to database to get attendances " + err);
  }
};

module.exports = {
  createProfessor,
  getProfessor,
  getSubjectOfProfessor,
  deleteStudent,
  acceptStudent,
  addHorary,
  deleteHorary,
  getAttendaces,
};
