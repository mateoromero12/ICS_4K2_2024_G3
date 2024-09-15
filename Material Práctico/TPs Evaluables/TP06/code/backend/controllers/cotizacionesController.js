const connection = require("../config/db");

const createCotizacion = (req, res) => {
  const {
    dador_id,
    transportista_id,
    fecha_retiro,
    fecha_entrega,
    importe,
    estado,
  } = req.body;

  const query = `
    INSERT INTO cotizaciones (dador_id, transportista_id, fecha_retiro, fecha_entrega, importe, estado)
    VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [dador_id, transportista_id, fecha_retiro, fecha_entrega, importe, estado],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Error al crear cotización" });
      }
      res.json({ message: "Cotización creada", id: results.insertId });
    }
  );
};

const getCotizacionesPorID = (req, res) => {
  const { id, idTransportista } = req.params;
  const query = `SELECT c.*, t.id AS transportista_id, t.usuario_id, t.calificacion, t.imagen FROM Cotizaciones c INNER JOIN Transportistas t ON t.id = c.transportista_id WHERE c.dador_id = ? AND c.transportista_id = ?;`;

  connection.query(query, [id, idTransportista], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener cotizaciones" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message:
          "No se encontró ninguna cotización para este dador y transportista.",
      });
    }

    res.json(results[0]);
  });
};

const getMetodosPagoPorCotizacion = (req, res) => {
  const { cotizacionId } = req.params;

  const query = `
    SELECT mp.*
    FROM CotizacionesFormasPago cmp
    INNER JOIN FormasPago mp ON cmp.forma_pago_id = mp.id
    WHERE cmp.cotizacion_id = ?;
  `;

  connection.query(query, [cotizacionId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener los métodos de pago para esta cotización",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "No se encontraron métodos de pago para esta cotización.",
      });
    }

    res.json(results);
  });
};

module.exports = {
  createCotizacion,
  getCotizacionesPorID,
  getMetodosPagoPorCotizacion,
};
