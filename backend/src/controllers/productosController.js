const { Producto } = require('../models');

exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id_producto);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const { nombre_producto, precio, cantidad, id_marca } = req.body;
    const producto = await Producto.create({ nombre_producto, precio, cantidad, id_marca });
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { nombre_producto, precio, cantidad, id_marca } = req.body;
    const producto = await Producto.findByPk(req.params.id_producto);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    producto.nombre_producto = nombre_producto;
    producto.precio = precio;
    producto.cantidad = cantidad;
    producto.id_marca = id_marca;
    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id_producto);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await producto.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
