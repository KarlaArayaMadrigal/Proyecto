const express = require('express');
const router = express.Router();
const marcasController = require('../controllers/marcasController');

// Endpoint para obtener todas las marcas
router.get('/', marcasController.getMarcas);

// Endpoint para obtener una marca por ID
router.get('/:id_marca', marcasController.getMarcaById);

// Endpoint para crear una nueva marca
router.post('/', marcasController.createMarca);

// Endpoint para actualizar una marca
router.put('/:id_marca', marcasController.updateMarca);

// Endpoint para eliminar una marca
router.delete('/:id_marca', marcasController.deleteMarca);

module.exports = router;
