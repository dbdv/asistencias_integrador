const { Model, DataTypes } = require("sequelize");
const DB = require("./DB");
const User = require("./User");
const Subject = require("./Subject");

class UserSubject extends Model {}

UserSubject.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
    },
    id_subject: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: DB, modelName: "UserSubject" }
);

/* UserSubject.hasOne(User, {
  as: "User",
  foreignKey: "id_user",
});
 */
module.exports = UserSubject;
