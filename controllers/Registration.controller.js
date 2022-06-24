const DB = require("../models/DB");
const RegistrationModel = require("../models/Registration");
const SubjectModel = require("../models/Subject");
const ScheduleModel = require("../models/Schedule");

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
          as: "Subject",
          include: [{ model: ScheduleModel, as: "Schedules" }],
        },
      ],
    });
  } catch (err) {
    console.log(
      "---------> Unable to connect to database to sign up student in the subject",
      err
    );
  }
};

module.exports = {
  getValidRegistrations,
};
