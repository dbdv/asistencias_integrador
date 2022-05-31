function getCoordinators() {
  const COORD = [];
  const query = "SELECT * FROM coordinators;";
  // Consulta a la BBDD
  return COORD;
}

function getCoordinatorById(id) {
  let coord = null;
  const query = `SELECT * FROM coordinators WHERE id = ${id};`;
  // Consulta a la BBDD
  return coord;
}

module.exports = {
  getCoordinators,
  getCoordinatorById,
};
