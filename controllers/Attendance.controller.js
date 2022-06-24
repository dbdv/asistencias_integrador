const AttendanceModel = require("../models/Attendance");

const markedToday = async (id) => {
  const att = await AttendanceModel.findOne({
    where: {
      id_registration: id,
      day: new Date(Date.now()).getDate(),
      month: new Date(Date.now()).getMonth(),
    },
  });

  if (att) return true;
  return false;
};

module.exports = {
  markedToday,
};
