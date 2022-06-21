var express = require("express");
var router = express.Router();
const { allSubjects } = require("../../controllers/Subject.controller");
const { getUser } = require("../../controllers/User.controller");
const {
  addSubject,
  getCoodinator,
} = require("../../controllers/Coordinator.controller");

router.get("/", getCoodinator);

router.post("/subject", addSubject);

router.get("/subeject/:id", function (req, res, next) {
  if (req.session.role == "coordinator") {
    return res.render("coordinators/subject.pug");
  }
  res.status(403);
  return res.redirect("/");
});

module.exports = router;
