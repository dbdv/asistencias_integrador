const DB = require("../models/DB");
const UserModel = require("../models/User");

const { getUser } = require("../controllers/User.controller");
const { encrypt } = require("../helpers/bcrypt");

const createProfessor = async (professor) => {
  try {
    await DB.authenticate();
    console.log("------> DB CONNECTED");

    let prof = await getUser(professor.email);

    if (prof) return null;

    return UserModel.create({
      ...professor,
      password: await encrypt(professor.password),
      id_role: 2,
    });
  } catch (err) {
    console.log("Unable to connect to database to create professor" + err);
  }
};

module.exports = {
  createProfessor,
};
