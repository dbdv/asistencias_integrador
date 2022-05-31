var express = require("express");
var router = express.Router();

const SUBJECTS = [{ title: "Laboratorio II" }, { title: "Bases de datos" }];

router.get("/", function (req, res, next) {
  console.log("cookie en /students: " + req.session.role);
  if (req.session.role == "student") return res.redirect("students/mySubjects");
  res.status(403);
  return res.redirect("/");
});

router.get("/mySubjects", function (req, res, next) {
  if (req.session.role == "student") {
    const student = req.session.name;
    return res.render("students/mySubjects.pug", { student, SUBJECTS });
  }
  res.status(403);
  return res.redirect("/");
});

module.exports = router;
