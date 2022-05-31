var express = require("express");
var router = express.Router();
var mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "integrador_DB",
});

router.post("/", function (req, res, next) {
  //   console.log("llegó a /auth");
  const USERS = [];

  // connection to DB

  const { email, pass } = req.body;
  req.session.message = null;
  req.session.already = null;

  if (!email || !pass) return res.sendStatus(400);

  connection.connect();

  connection.query(
    `SELECT * FROM user WHERE user.email = "${email}"`,
    function (err, rows, fields) {
      if (err) throw err;

      // console.log(r);
      const user = { ...rows[0] };
      //   console.log("user: "+user)

      if (user === undefined) {
        req.session.message = true;
        return res.redirect("/");
      }

      if (user.pass !== pass) {
        req.session.message = true;
        return res.redirect("/");
      }

      let rol;
      connection.query(
        `SELECT rol.rol FROM rol WHERE id_rol = ${user.id_rol}`,
        function (err, rows, fields) {
          if (err) throw err;
          rol = rows[0].rol;
          // console.log(rol);
          req.session.role = rol;
          req.session.email = email;
          req.session.name = user.first_name;
          req.session.message = null;
          req.session.already = false;

          //   console.log(user.role);

          connection.end();
          return res.redirect("/" + rol + "s");
        }
      );
    }
  );
});

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

  // //console.table(email, pass);

  // var connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "integrador_DB",
  // });

  connection.connect();

  // console.log("llegó hasta el select");

  connection.query(
    `SELECT * FROM user WHERE email = "${email}" OR dni = ${dni}`,
    function (err, rows, fields) {
      if (err) throw err;
      // console.log("rows: ");
      // console.table(rows[0]);
      let user = rows[0];

      if (user !== undefined) {
        // console.log("ya usuario");
        req.session.already = true;
        res.status(406);
        return res.redirect("/");
      }

      // console.log("llegó hasta el insert");
      connection.query(
        `INSERT INTO user (email, pass, first_name, last_name, id_rol, dni) VALUES (?,?,?,?,?,?)`,
        [email, pass, firstName, lastName, 1, parseInt(dni)],
        function (err, rows, fields) {
          if (err) throw err;
          // INSERT INTO `matriculate` (`id_career`, `id_user`) VALUES ('1', '7');
          connection.query(
            `INSERT INTO matriculate (id_career, id_user) VALUES (?,?)`,
            [parseInt(career), rows.insertId],
            function (err, rows, fields) {
              if (err) throw err;
              console.log("usuarios registrados ");
              req.session.already = false;
              connection.end();
              return res.redirect("/");
            }
          );
        }
      );
    }
  );
});

module.exports = router;
