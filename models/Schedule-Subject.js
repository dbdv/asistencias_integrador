const { Model, DataTypes } = require("sequelize");
const DB = require("./DB");
const Schedule = require("./Schedule");
const Subject = require("./Subject");

class ScheduleSubject extends Model {}

ScheduleSubject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_schedule: {
      type: DataTypes.INTEGER,
    },
    id_subject: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize: DB, modelName: "ScheduleSubject", timestamps: false }
);

ScheduleSubject.hasOne(Schedule, {
  as: "Schedule",
  foreignKey: "id_schedule",
});

ScheduleSubject.hasOne(Subject, {
  as: "Subject",
  foreignKey: "id_subject",
});

module.exports = ScheduleSubject;
