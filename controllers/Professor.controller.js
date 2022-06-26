const DB = require("../models/DB");
const UserModel = require("../models/User");

const { getUser } = require("../controllers/User.controller");
const { encrypt } = require("../helpers/bcrypt");
const {
  getAllInvalidRegistrations,
  getAllValidRegistrations,
} = require("./Registration.controller");
const {
  allSubjects,
  getSubjectInfo,
  allSubjectsOfOneProfessors,
} = require("./Subject.controller");

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

    let prof = await getUser(professor.email);

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

  if (!subjectInfo)
    return res.status(404).send({
      mesagge:
        "No se encontró informacion sobre la asocion de esta materia con este profesor",
    });
  const requests = await getAllInvalidRegistrations(subjectInfo.id);
  const students = await getAllValidRegistrations(subjectInfo.id);
  console.log(requests, students);

  return res.render("professors/course.pug", {
    subject: subjectInfo,
    requests,
    students,
    HOURS_START: HOURS.slice(0, -8),
    HOURS_END: HOURS.slice(8),
  });
};

module.exports = {
  createProfessor,
  getProfessor,
  getSubjectOfProfessor,
};
