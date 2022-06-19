const Subject = require("../models/Subject");
const DB = require("../models/DB");

const allSubjects = async () => {
  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");
    return Subject.findAll();
  } catch (error) {
    console.error("Unable to connect to database to get SUBJECTS: " + error);
  }
};

module.exports = {
  allSubjects,
};
