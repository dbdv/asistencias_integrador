const { Model, DataTypes } = require("sequelize");
const DB = require("./DB");
const User = require("./User");
const Subject = require("./Subject");

class Registration extends Model {}

Registration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
    id_subject: {
      type: DataTypes.INTEGER,
    },
    validated: {
      type: DataTypes.BOOLEAN,
    },
  },
  { sequelize: DB, modelName: "Registration", timestamps: false }
);

Registration.hasOne(User, {
  as: "User",
  foreignKey: "id_user",
});
Registration.hasOne(Subject, {
  as: "Subject",
  foreignKey: "id_subject",
});

Registration.belongsTo(User, {
  as: "Registration",
  foreignKey: "id_registration",
});
Registration.belongsTo(Subject, {
  as: "Registration",
  foreignKey: "id_registration",
});

User.hasMany(Registration, {
  as: "Registrations",
  foreignKey: "id_user",
});

Subject.hasMany(Registration, {
  as: "Resgitrations",
  foreignKey: "id_subject",
});

module.exports = Registration;
