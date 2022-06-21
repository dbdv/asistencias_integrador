var express = require("express");
var router = express.Router();

const { getStudent } = require("../../controllers/Student.controller");

// router.get("/", getStudent);
router.get("/", getStudent);

module.exports = router;
