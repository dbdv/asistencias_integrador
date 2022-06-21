const DB = require("../models/DB");
const UserModel = require("../models/User");

const getStudent = async (req, res, next) => {
  try {
    await DB.authenticate();
    console.log("---------> Dabatase connected");

    const student = await UserModel.findByPk(req.session.idUser, {
      include: "Subjects",
    });

    return res.render("students/mySubjects.pug", {
      student: student,
      SUBJECTS: [], //student.Subjects,
    });
  } catch (err) {
    console.log("---------> Unable to connect to database to get student", err);
  }
};

module.exports = {
  getStudent,
};
