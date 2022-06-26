const AttendanceModel = require("../models/Attendance");
const db = require("../models/DB");
const DB = require("../models/DB");

const markedToday = async (id) => {
  try {
    await DB.authenticate();
    console.log("Database connected");

    return AttendanceModel.findOne({
      where: {
        id_registration: id,
        day: new Date(Date.now()).getDate(),
        month: new Date(Date.now()).getMonth(),
      },
    });
  } catch (err) {
    console.log("Unable to connect to database to check attentance");
  }
};

const getTodayAttendances = async () => {
  const att = await AttendanceModel.findOne({
    where: {
      id_registration: id,
      day: new Date(Date.now()).getDate(),
      month: new Date(Date.now()).getMonth(),
    },
  });
};

module.exports = {
  markedToday,
};
