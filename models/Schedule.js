const { Model, DataTypes } = require("sequelize");
const DB = require("./DB");
const ScheduleSubject = require("./Schedule-Subject");
const Subject = require("./Subject");

class Schedule extends Model {}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dayOfWeek: {
      type: DataTypes.STRING,
    },
    startAt: {
      type: DataTypes.STRING,
    },
    endAt: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: DB, modelName: "Schedule" }
);

Schedule.hasMany(Subject, {
  as: "Subjects",
  foreignKey: "id_subject",
});

Schedule.belongsToMany(Subject, {
  through: ScheduleSubject,
  foreignKey: id_schedule,
  as: "Schedules",
});

Subject.belongsToMany(Schedule, {
  through: ScheduleSubject,
  foreignKey: "id_subject",
  as: "Subjects",
});

Subject.hasMany(Schedule, {
  as: "Schedules",
  foreignKey: "id_schedule",
});

module.exports = Schedule;
