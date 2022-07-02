var express = require("express");
var router = express.Router();
const path = require("path");
var xl = require("excel4node");

const {
  getProfessor,
  getSubjectOfProfessor,
  deleteStudent,
  acceptStudent,
  addHorary,
  deleteHorary,
  getAttendaces,
} = require("../../controllers/Professor.controller");

router.get("/", getProfessor);

router.get("/course/:id", getSubjectOfProfessor);
router.post("/deleteStudent", deleteStudent);
router.post("/acceptStudent", acceptStudent);
router.post("/addHorary", addHorary);
router.post("/deleteHorary", deleteHorary);
router.get("/course/:id/attendances", getAttendaces);

router.get(
  "/myCourses/course/:id/attendance/download",
  function (req, res, next) {
    const ATTENDANCES = [
      {
        month: "Febrero",
        dates: [
          "Usuario",
          "Nombre",
          "Apellido",
          "17/02",
          "19/02",
          "20/02",
          "25/02",
          "26/02",
          "01/03",
          "03/03",
          "17/02",
          "19/02",
          "20/02",
          "25/02",
          "26/02",
          "01/03",
          "03/03",
        ],
        students: [
          {
            first_name: "Juan",
            last_name: "Perez",
            user: "JuanPerezUser",
            ATTENS: [
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
            ],
          },
          {
            first_name: "Lucas",
            last_name: "Diaz",
            user: "LucasDiazUser",
            ATTENS: [
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
            ],
          },
          {
            first_name: "Romina",
            last_name: "Quiroga",
            user: "RominaQuirogaUser",
            ATTENS: [
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
            ],
          },
          {
            first_name: "Lucia",
            last_name: "Leyes",
            user: "LuciaLeyesUser",
            ATTENS: [
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
            ],
          },
        ],
      },
      {
        month: "Marzo",
        dates: [
          "Usuario",
          "Nombre",
          "Apellido",
          "17/02",
          "19/02",
          "20/02",
          "25/02",
          "26/02",
          "01/03",
          "03/03",
          "17/02",
          "19/02",
          "20/02",
          "25/02",
          "26/02",
          "01/03",
          "03/03",
        ],
        students: [
          {
            first_name: "Juan",
            last_name: "Perez",
            user: "JuanPerezUser",
            ATTENS: [
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
            ],
          },
          {
            first_name: "Lucas",
            last_name: "Diaz",
            user: "LucasDiazUser",
            ATTENS: [
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
            ],
          },
          {
            first_name: "Romina",
            last_name: "Quiroga",
            user: "RominaQuirogaUser",
            ATTENS: [
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
            ],
          },
          {
            first_name: "Lucia",
            last_name: "Leyes",
            user: "LuciaLeyesUser",
            ATTENS: [
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
              "P",
            ],
          },
        ],
      },
    ];
    const wb = new xl.Workbook();
    const style = wb.createStyle({
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
      border: {
        left: {
          style: "medium",
          color: "#3b78a3",
        },
        right: {
          style: "medium",
          color: "#3b78a3",
        },
        top: {
          style: "medium",
          color: "#3b78a3",
        },
        bottom: {
          style: "medium",
          color: "#3b78a3",
        },
      },
      font: {
        size: 14,
      },
      fill: {
        bgColor: "#3b78a3",
        type: "pattern",
      },
    });

    ATTENDANCES.forEach((att) => {
      let i = 2,
        j = 1;
      let ws = wb.addWorksheet(`${att.month}`);

      att.dates.forEach((date) => {
        let formatedDate = date.split("/").reverse().join("-");
        // formatedDate = [...formatedDate]
        // console.log(formatedDate)
        ws.cell(1, j).string(date);
        // ws.cell(1, j).date(`2022-${formatedDate}`).style({numberFormat: 'dd/mm/yyyy'});
        j++;
      });

      j = 4;

      att.students.forEach((stud) => {
        ws.cell(i, 1).string(stud.user);
        ws.cell(i, 2).string(stud.first_name);
        ws.cell(i, 3).string(stud.last_name);
        stud.ATTENS.forEach((att) => {
          ws.cell(i, j).string(att);
          j++;
        });
        j = 4;
        i++;
      });

      ws.cell(1, 1).style(style);
      ws.cell(1, 2).style(style);
      ws.cell(1, 3).style(style);
    });

    const pathExcel = path.join(__dirname, "excels", "assitenciasMateria.xlsx");
    wb.write(pathExcel, async (err, stats) => {
      if (err) console.log(err);
      else {
        return res.download(pathExcel);
      }
    });
  }
);

module.exports = router;
