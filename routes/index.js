var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // console.log(req.session.email)
  //console.log(req.session.message);

  if (req.session.role) {
    return res.redirect("/" + req.session.role + "s");
  }
  if (req.session.message)
    return res.render("index", {
      message: req.session.message || false,
    });
  console.log(req.session.already);

  return res.render("index", { already: req.session.already });
});

module.exports = router;
