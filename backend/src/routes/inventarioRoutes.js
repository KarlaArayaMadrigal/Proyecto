

const express = require('express');
const router = express.Router();
const { Producto } = require('../models'); // Asumiendo que tienes un modelo Producto

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll(); // Obtener todos los productos desde la base de datos
    res.json(productos); // Devolver los productos como respuesta
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

module.exports = router;
