const DB = require("../models/DB");
const UserModel = require("../models/User");
const { encrypt, comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

const validateUser = async (req, res, next) => {
  console.log(req.body);
  const { email, pass } = req.body;

  try {
    await DB.authenticate();
    console.log("-----------> Dabatase connected");

    const user = await UserModel.findOne({
      where: {
        email: email,
      },
      include: "Role",
    });

    if (!user) res.status(404).send();

    if (!(await comparePass(pass, user.pass))) res.status(401).send();
    // console.log(user.Role.name);

    req.session.token = generateToken(user.id);
    req.session.role = user.Role.name;
    req.session.email = email;

    res.status(200).send();
  } catch (err) {
    console.error("Unable to connect to database to get user", err);
  }
};

module.exports = {
  validateUser,
};
