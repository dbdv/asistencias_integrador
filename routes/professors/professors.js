var express = require("express");
var router = express.Router();
const path = require("path");
var xl = require("excel4node");

const {
  getProfessor,
  getSubjectOfProfessor,
} = require("../../controllers/Professor.controller");

const COURSES = [
  {
    id: 1,
    title: "Laboratorio II",
    week: {
      Lunes: {
        scheduled: true,
        startAt: "9:00",
        endAt: "12:00",
      },
      Martes: {
        scheduled: false,
        startAt: "9:00",
        endAt: "12:00",
      },
      Miercoles: {
        scheduled: false,
        startAt: null,
        endAt: null,
      },
      Jueves: {
        scheduled: true,
        startAt: "14:00",
        endAt: "17:00",
      },
      Viernes: {
        scheduled: true,
        startAt: "14:00",
        endAt: "16:00",
      },
    },
  },
  {
    id: 2,
    title: "Bases de datos",
    week: {
      Lunes: {
        scheduled: false,
        startAt: null,
        endAt: "12:00",
      },
      Martes: {
        scheduled: true,
        startAt: "18:00",
        endAt: "21:00",
      },
      Miercoles: {
        scheduled: true,
        startAt: "15:00",
        endAt: "20:00",
      },
      Jueves: {
        scheduled: true,
        startAt: "16:30",
        endAt: "19:00",
      },
      Viernes: {
        scheduled: false,
        startAt: null,
        endAt: null,
      },
    },
  },
];

const REQUESTS = [
  {
    first_name: "Gerardo",
    last_name: "Barroso",
    dni: 42937489,
    email: "gb@mail.com ",
    carrer: "TUDS",
  },
  {
    first_name: "Alejandro",
    last_name: "Diaz",
    dni: 40937238,
    email: "af@mail.com ",
    carrer: "TUDSs",
  },
];

router.get("/", getProfessor);

router.get("/myCourses/course/:id", getSubjectOfProfessor);

router.get("/myCourses/course/:id/attendance", function (req, res, next) {
  const course = COURSES.find((c) => c.id === parseInt(req.params.id));
  const MONTHS = [
    {
      name: "Febrero",
      daysFebrero: [
        "17/02",
        "19/02",
        "20/02",
        "25/02",
        "26/02",
        "01/03",
        "03/03",
      ],
    },
    {
      name: "Marzo",
      daysMarzo: [
        "17/02",
        "19/02",
        "20/02",
        "25/02",
        "26/02",
        "01/03",
        "03/03",
      ],
    },
    {
      name: "Abril",
      daysAbril: [
        "17/02",
        "19/02",
        "20/02",
        "25/02",
        "26/02",
        "01/03",
        "03/03",
      ],
    },
    {
      name: "Mayo",
      daysAbril: [
        "17/02",
        "19/02",
        "20/02",
        "25/02",
        "26/02",
        "01/03",
        "03/03",
      ],
    },
  ];
  const STUDENTS = [
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
  ];

  return res.render("professors/courseAttendance.pug", {
    course,
    MONTHS,
    STUDENTS,
  });
});

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
