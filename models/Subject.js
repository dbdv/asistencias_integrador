const { Model, DataTypes } = require("sequelize");
const DB = require("./DB");
const User = require("./User");
const UserSubject = require("./User-Subject");

class Subject extends Model {}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: DB, modelName: "Subject" }
);

/* Subject.belongsToMany(User, {
  through: UserSubject,
  as: "Subjects",
}); */
/* Subject.hasMany(User, {
  through: UserSubject,
  as: "Users",
});

User.hasMany(Subject, {
  through: UserSubject,
  as: "Subjects",
}); */

/* User.belongsToMany(
  Subject,
  {
    through: UserSubject,
    as: "Users",
  },
  { sequelize: DB, modelName: "Subject" }
);

UserSubject.hasOne(Subject, {
  as: "Subject",
  foreignKey: "id_subject",
});
 */
module.exports = Subject;
