var express = require("express");
var router = express.Router();
const { allSubjects } = require("../../controllers/Subject.controller");
const { getUser } = require("../../controllers/User.controller");

router.get("/", async function (req, res, next) {
  const { email, role } = req.session;
  console.log("cookie en /coordinators: " + role);
  if (!role == "Coordinator") res.status(403).redirect("/");
  const SUBJECTS = await allSubjects();

  const coordinator = await getUser(email);
  console.log();
  return res.render("coodinators/coordinatorsHome.pug", {
    coordinator: `${coordinator.first_name} ${coordinator.last_name}`,
    SUBJECTS,
  });
});

router.get("/subeject/:id", function (req, res, next) {
  if (req.session.role == "coordinator") {
    return res.render("coordinators/subject.pug");
  }
  res.status(403);
  return res.redirect("/");
});

module.exports = router;
