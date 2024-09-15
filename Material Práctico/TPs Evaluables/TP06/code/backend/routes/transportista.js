const express = require('express');
const router = express.Router();
const { getTransportistas, getMisCotizacionesPendientes, getMisCotizacionesConfirmadas } = require('../controllers/transportistaController');

router.get('/:dador_id', getTransportistas);

router.get('/logueado/pendientes/:id', getMisCotizacionesPendientes);
router.get('/logueado/confirmadas/:id', getMisCotizacionesConfirmadas);

module.exports = router;
