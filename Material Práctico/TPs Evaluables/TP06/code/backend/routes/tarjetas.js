const express = require('express');
const router = express.Router();
const { getTarjetasByDador, agregarTarjeta } = require('../controllers/tarjetasController');

router.get('/:dador_id', getTarjetasByDador );
router.post('/agregar', agregarTarjeta );

module.exports = router;
