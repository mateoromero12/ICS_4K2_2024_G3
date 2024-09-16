const express = require('express');
const router = express.Router();
const { enviarCorreoNuevaCotizacion } = require('../controllers/mailController');

router.post('/enviar-correo', async (req, res) => {
  const { correoTransportista, cotizacion } = req.body;

  try {
    await enviarCorreoNuevaCotizacion(correoTransportista, cotizacion);
    res.status(200).json({ message: 'Correo enviado exitosamente.' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});

module.exports = router;
