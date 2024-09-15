const connection = require("../config/db");

const createPago = (req, res) => {
  const {
    cotizacion_id,
    forma_pago_id,
    numero_tarjeta,
    nombre_completo,
    tipo_documento,
    numero_documento,
    importe_a_pagar,
    tipo,
    saldo 
  } = req.body;

  if (forma_pago_id === 1) {  // para pagos con tarjeta
    console.log("Pago con tarjeta seleccionado");

    const queryUpdateSaldo = `
      UPDATE Tarjetas 
      SET saldo = saldo - ? 
      WHERE numero_tarjeta = ? 
      AND tipo = ? 
      AND nombre_completo = ? 
      AND tipo_documento = ? 
      AND numero_documento = ?;
    `;

    connection.query(
      queryUpdateSaldo,
      [importe_a_pagar, numero_tarjeta, tipo, nombre_completo, tipo_documento, numero_documento],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el saldo de la tarjeta:", err);
          return res.status(500).json({ error: "Error al actualizar el saldo de la tarjeta" });
        }

        console.log("Saldo actualizado correctamente, filas afectadas:", result.affectedRows);

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Tarjeta no encontrada o datos incorrectos" });
        }

        const queryPago = `
          INSERT INTO Pagos (cotizacion_id, forma_pago_id, importe_a_pagar, tarjeta_id)
          VALUES (?, ?, ?, (SELECT id FROM Tarjetas WHERE numero_tarjeta = ?));
        `;

        connection.query(
          queryPago,
          [cotizacion_id, forma_pago_id, importe_a_pagar, numero_tarjeta],
          (err, pagoResult) => {
            if (err) {
              console.error("Error al crear el pago:", err);
              return res.status(500).json({ error: "Error al crear el pago" });
            }

            console.log("Pago insertado correctamente con ID:", pagoResult.insertId);

            const queryCotizacion = `UPDATE Cotizaciones SET estado = 'Confirmado' WHERE id = ?`;
            connection.query(queryCotizacion, [cotizacion_id], (err) => {
              if (err) {
                console.error("Error al actualizar el estado de la cotización:", err);
                return res.status(500).json({ error: "Error al actualizar el estado de la cotización" });
              }

              res.json({
                message: "Pago realizado y cotización confirmada",
                pagoId: pagoResult.insertId,
              });
            });
          }
        );
      }
    );
  } else {
    // aca se realiza para pagos en contado/efectivo lo pusimos en la bd
    const queryPago = `
      INSERT INTO Pagos (cotizacion_id, forma_pago_id, importe_a_pagar)
      VALUES (?, ?, ?);
    `;

    connection.query(
      queryPago,
      [cotizacion_id, forma_pago_id, importe_a_pagar],
      (err, pagoResult) => {
        if (err) {
          console.error("Error al crear el pago en efectivo:", err);
          return res.status(500).json({ error: "Error al crear el pago en efectivo" });
        }

        const queryCotizacion = `UPDATE Cotizaciones SET estado = 'Confirmado' WHERE id = ?`;
        connection.query(queryCotizacion, [cotizacion_id], (err) => {
          if (err) {
            return res.status(500).json({ error: "Error al actualizar el estado de la cotización" });
          }

          res.json({
            message: "Pago en efectivo realizado y cotización confirmada",
            pagoId: pagoResult.insertId,
          });
        });
      }
    );
  }
};

module.exports = { createPago };
