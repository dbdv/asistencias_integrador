const DB = require("../models/DB");
const UserModel = require("../models/User");
const RegistrationModel = require("../models/Registration");

const { getAllValidRegistrations } = require("./Registration.controller");

const getConflicts = async (req, res, next) => {
  try {
    await DB.authenticate();
    console.log("-----------> Dabatase connected");

    const registrations = await getAllValidRegistrations();

    // res.send(JSON.parse(registrations));
    res.json(registrations);
  } catch (err) {
    console.error("Unable to connect to database to get conflicts", err);
  }
};

module.exports = {
  getConflicts,
};
