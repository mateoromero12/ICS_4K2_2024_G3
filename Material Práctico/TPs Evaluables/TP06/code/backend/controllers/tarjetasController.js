const connection = require("../config/db");

const agregarTarjeta = (req, res) => {
  const { numero_tarjeta, cvv, nombre_completo, fecha_vencimiento, tipo, saldo, dador_id, tipo_documento, numero_documento } = req.body;
  const query = `INSERT INTO Tarjetas (numero_tarjeta, cvv, nombre_completo, fecha_vencimiento, tipo, saldo, dador_id, tipo_documento, numero_documento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  connection.query(query, [numero_tarjeta, cvv, nombre_completo, fecha_vencimiento, tipo, saldo, dador_id, tipo_documento, numero_documento], (err, results) => {
    if (err) {
      console.error("Error al agregar la tarjeta:", err); 
      return res.status(500).json({ error: err.message }); 
    }
    res.json({ message: "Tarjeta agregada correctamente" });
  });
}

const getTarjetasByDador = (req, res) => {
    const { dador_id } = req.params;
  
    const query = `SELECT * FROM Tarjetas WHERE dador_id = ?;`;
  
    connection.query(query, [dador_id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Error al obtener las tarjetas" });
      }
      res.json(results);
    });
  };
  
  module.exports = { getTarjetasByDador, agregarTarjeta };
  