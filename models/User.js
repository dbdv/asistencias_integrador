const { Model, DataTypes } = require("sequelize");
const DB = require("./DB");
const Role = require("./Role");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    pass: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.INTEGER,
    },
    id_role: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize: DB, modelName: "User" }
);

User.belongsTo(Role, {
  as: "Role",
  foreignKey: "id_role",
});

Role.hasMany(User, {
  as: "User",
  foreignKey: "id_role",
});

module.exports = User;
