const DB = require("../models/DB");
const UserModel = require("../models/User");
const { encrypt, comparePass } = require("../helpers/bcrypt");

const getUser = async (email) => {
  try {
    await DB.authenticate();
    console.log("Dabatase connected");

    return UserModel.findOne({
      where: {
        email: email,
      },
    });
  } catch (err) {
    console.log("Unable to connect to database to get user", err);
  }
};

module.exports = {
  getUser,
};