const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Obtener todas las ventas
router.get('/', ventasController.getVentas);

// Obtener una venta por ID
router.get('/:id_venta', ventasController.getVentaById);

// Crear una nueva venta
router.post('/', ventasController.createVenta);

// Actualizar una venta
router.put('/:id_venta', ventasController.updateVenta);

// Eliminar una venta
router.delete('/:id_venta', ventasController.deleteVenta);

module.exports = router;
