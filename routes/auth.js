var express = require("express");
var router = express.Router();

const { validateUser } = require("../controllers/Auth.controller");

router.post("/", function (req, res, next) {
  //   console.log("llegó a /auth");
  const USERS = [];

  // connection to DB

  const { email, pass } = req.body;
  req.session.message = null;
  req.session.already = null;

  if (!email || !pass) return res.sendStatus(400);
});

router.post("/login", validateUser);

router.post("/logout", function (req, res, next) {
  req.session.role = null;
  req.session.email = null;
  req.session.message = null;
  req.session.already = null;

  req.session.destroy();
  // res.clearCookie()
  //   console.log(req.session.role, req.session.email);
  setTimeout(() => {
    res.redirect("/");
  }, 500);
});

router.post("/signUp", function (req, res, next) {
  // console.log("llegó a /auth/signUp");
  // console.log(req);
  const { email, pass, dni, firstName, lastName, career } = req.body;
});

module.exports = router;
