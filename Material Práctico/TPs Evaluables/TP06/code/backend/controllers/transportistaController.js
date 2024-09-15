const connection = require("../config/db");

const getTransportistas = (req, res) => {
  const { dador_id } = req.params;
  const query = `
  SELECT u.*, t.*, c.estado
  FROM Usuarios u 
  INNER JOIN Transportistas t ON t.usuario_id = u.id 
  INNER JOIN Cotizaciones c ON c.transportista_id = t.id 
  WHERE c.dador_id = ?
`;
  connection.query(query, [dador_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener transportistas" });
    }
    res.json(results);
  });
};

const getMisCotizacionesPendientes = (req, res) => {
  const { id } = req.params;
  const query = `SELECT c.* FROM cotizaciones c INNER JOIN transportistas t ON t.id = c.transportista_id WHERE t.id = ? AND c.estado = 'Pendiente'`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener las cotizaciones del transportista logueado" });
    }
    res.json(results);
  });
};

const getMisCotizacionesConfirmadas = (req, res) => {
  const { id } = req.params;
  const query = `SELECT c.* FROM cotizaciones c INNER JOIN transportistas t ON t.id = c.transportista_id WHERE t.id = ? AND c.estado = 'Confirmado'`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener las cotizaciones confirmadas del transportista logueado" });
    }
    res.json(results);
  });
}

module.exports = { getTransportistas, getMisCotizacionesPendientes, getMisCotizacionesConfirmadas };
