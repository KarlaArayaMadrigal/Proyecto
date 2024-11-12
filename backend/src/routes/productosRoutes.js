const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Obtener todos los productos
router.get('/', productosController.getProductos);

// Obtener un producto por ID
router.get('/:id_producto', productosController.getProductoById);

// Crear un nuevo producto
router.post('/', productosController.createProducto);

// Actualizar un producto
router.put('/:id_producto', productosController.updateProducto);

// Eliminar un producto
router.delete('/:id_producto', productosController.deleteProducto);

module.exports = router;
