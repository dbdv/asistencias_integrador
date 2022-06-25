const Subject = require("../models/Subject");
const UserModel = require("../models/User");
const ProfessorSubjectModel = require("../models/User-Subject");
const DB = require("../models/DB");

const allSubjects = async () => {
  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");
    return Subject.findAll();
  } catch (error) {
    console.error(
      "------> Unable to connect to database to get SUBJECTS: " + error
    );
  }
};

const allSubjectsProfessors = async () => {
  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");
    return Subject.findAll({
      include: [{ model: UserModel, as: "Users" }],
    });
  } catch (error) {
    console.error(
      "------> Unable to connect to database to get SUBJECTS with Professors: " +
        error
    );
  }
};

const createSubject = async (name) => {
  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");

    const exist = await Subject.findOne({
      where: {
        name: name,
      },
    });

    if (exist) return null;

    return Subject.create({ name: name });
  } catch (error) {
    console.error(
      "------> Unable to connect to database to create SUBJECT: " + error
    );
  }
};

const linkProfessorToSubject = async (idProfessor, idSubject) => {
  try {
    await DB.authenticate();

    console.log("------> DB CONNECTED");

    let link = await ProfessorSubjectModel.findOne({
      where: {
        id_user: idProfessor,
        id_subject: idSubject,
      },
    });

    if (link) return null;

    return await ProfessorSubjectModel.create({
      id_user: idProfessor,
      id_subject: idSubject,
    });
  } catch (error) {
    console.error(
      "------> Unable to connect to database to get SUBJECTS with Professors: " +
        error
    );
  }
};

const unlinkProfessorToSubject = async (idProfessor, idSubject) => {
  try {
    await DB.authenticate();

    console.log("------> DB CONNECTED");

    let link = await ProfessorSubjectModel.findOne({
      where: {
        id_user: idProfessor,
        id_subject: idSubject,
      },
    });

    if (!link) return false;

    await link.destroy();

    return true;
  } catch (error) {
    console.error(
      "------> Unable to connect to database to get SUBJECTS with Professors: " +
        error
    );
  }
};

module.exports = {
  allSubjects,
  createSubject,
  allSubjectsProfessors,
  linkProfessorToSubject,
  unlinkProfessorToSubject,
};
