const Subject = require("../models/Subject");
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

module.exports = {
  allSubjects,
  createSubject,
};
