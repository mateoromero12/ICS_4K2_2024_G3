const express = require('express');
const router = express.Router();
const { createCotizacion, getCotizacionesPorID, getMetodosPagoPorCotizacion } = require('../controllers/cotizacionesController');

router.post('/', createCotizacion);
router.get('/:id/:idTransportista', getCotizacionesPorID);
router.get('/:cotizacionId', getMetodosPagoPorCotizacion);

module.exports = router;
