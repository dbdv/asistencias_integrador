const DB = require("../models/DB");
const UserModel = require("../models/User");

const { getUser } = require("../controllers/User.controller");
const { encrypt } = require("../helpers/bcrypt");
const { getAllInvalidRegistrations } = require("./Registration.controller");
const { allSubjects } = require("./Subject.controller");

const getProfessor = async (req, res, next) => {
  const idProfessor = req.session.idUser;

  try {
    await DB.authenticate();
    console.log("---------> Dabatase connected");

    const registrations = await getAllInvalidRegistrations(idProfessor);
    const professor = await getUser(req.session.email);
    const subjects = await allSubjects();

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

module.exports = {
  createProfessor,
  getProfessor,
};
