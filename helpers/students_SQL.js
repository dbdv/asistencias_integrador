function getStudents() {
  const STUDENTS = [];
  const query = "SELECT * FROM students;";
  // Consulta a la BBDD
  return STUDENTS;
}

function getStudentById(id) {
  let student = null;
  const query = `SELECT * FROM students WHERE id = ${id};`;
  // Consulta a la BBDD
  return student;
}

module.exports = {
  getStudents,
  getStudentById,
};
