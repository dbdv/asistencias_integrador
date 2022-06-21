const { createSubject, allSubjects } = require("./Subject.controller");
const { getUser } = require("./User.controller");

const addSubject = async (req, res, next) => {
  const { name } = req.body;
  const subject = await createSubject(name);

  if (!subject) res.status(409).send();

  res.status(201).send();
};

const getCoodinator = async (req, res, next) => {
  const { email, role } = req.session;
  console.log("cookie en /coordinators: " + role);
  if (!role == "Coordinator") res.status(403).redirect("/");
  const SUBJECTS = await allSubjects();

  const coordinator = await getUser(email);
  console.log(SUBJECTS);

  return res.render("coodinators/coordinatorsHome.pug", {
    coordinator,
    SUBJECTS,
  });
};

module.exports = {
  addSubject,
  getCoodinator,
};
