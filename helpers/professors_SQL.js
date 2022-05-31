function getProfessors() {
  const PROFESS = [];
  const query = "SELECT * FROM professors;";
  // Consulta a la BBDD
  return PROFESS;
}

function getProfessorById(id) {
  let prof = null;
  const query = `SELECT * FROM coordinators WHERE id = ${id};`;
  // Consulta a la BBDD
  return prof;
}

module.exports = {
  getProfessors,
  getProfessorById,
};
