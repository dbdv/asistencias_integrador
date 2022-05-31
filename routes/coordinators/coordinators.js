var express = require("express");
var router = express.Router();


router.get("/", function (req, res, next) {
  console.log("cookie en /coordinators: " + req.session.role);
  if (req.session.role == "coordinator") {
    const SUBJECTS = [
      { id: "1", title: "Bases de datos", average: 0.8 },
      { id: "3", title: "Ingenieria", average: 0.6 },
      { id: "5", title: "Laboratorio I", average: 0.4 },
    ];

    const coordinator = "Sergio Ramos"
    return res.render("coodinators/coordinatorsHome.pug", { coordinator , SUBJECTS });
  }
  res.status(403);
  return res.redirect("/");
});

router.get("/subeject/:id", function (req, res, next) {
  if (req.session.role == "coordinator") {
    return res.render("coordinators/subject.pug");
  }
  res.status(403);
  return res.redirect("/");
});

module.exports = router;
