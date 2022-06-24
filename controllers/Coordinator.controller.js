const DB = require("../models/DB");

const {
  createSubject,
  allSubjectsProfessors,
  linkProfessorToSubject,
} = require("./Subject.controller");
const { getUser, getAllProfessors } = require("./User.controller");
const { createProfessor } = require("./Professor.controller");

const addSubject = async (req, res, next) => {
  const { name } = req.body;

  const subject = await createSubject(name);

  if (!subject) res.status(409).send();

  res.status(201).send();
};

const addProfessor = async (req, res, next) => {
  const { professorBody } = req.body;

  const professor = await createProfessor(professorBody);

  if (!professor) res.status(409).send();

  res.status(201).send();
};

const getCoodinator = async (req, res, next) => {
  const { email, role } = req.session;
  // console.log("cookie en /coordinators: " + role);
  // if (!role == "Coordinator") res.status(403).redirect("/");
  const coordinator = await getUser(email);
  if (!coordinator)
    res.status(404).send({ mesagge: "Coordinador no encontrado" });

  const SUBJECTS = await allSubjectsProfessors();
  const professors = await getAllProfessors();
  // console.log(SUBJECTS[0]);

  return res.render("coodinators/coordinatorsHome.pug", {
    coordinator,
    professors,
    SUBJECTS,
  });
};

const assignProfessorToSubject = async (req, res, next) => {
  const { idSubject, idProfessor } = req.body;

  const link = await linkProfessorToSubject(idProfessor, idSubject);

  if (!link)
    return res
      .status(409)
      .send({ message: "Ya está registrado este profesor para esta materia" });

  res.status(201).send();
};

module.exports = {
  addSubject,
  addProfessor,
  getCoodinator,
  assignProfessorToSubject,
};
