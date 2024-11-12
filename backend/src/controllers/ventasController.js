const { Venta } = require('../models');

exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
};

exports.getVentaById = async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id_venta);
    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la venta", error });
  }
};

exports.createVenta = async (req, res) => {
  try {
    const { fecha_venta, precio, id_producto, cantidad } = req.body;
    // Asegurarse de que el producto exista antes de crear la venta
    const producto = await Producto.findByPk(id_producto);
    if (!producto) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }

    // Calcular el total de la venta (precio * cantidad)
    const total_venta = precio * cantidad;

    const venta = await Venta.create({ fecha_venta, total_venta, id_producto, cantidad });
    res.status(201).json(venta);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la venta", error });
  }
};

exports.updateVenta = async (req, res) => {
  try {
    const { fecha_venta, precio, cantidad } = req.body;
    const venta = await Venta.findByPk(req.params.id_venta);
    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    // Actualizar los datos de la venta
    venta.fecha_venta = fecha_venta;
    venta.precio = precio;
    venta.cantidad = cantidad;
    venta.total_venta = precio * cantidad;

    await venta.save();
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la venta", error });
  }
};

exports.deleteVenta = async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id_venta);
    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }
    await venta.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la venta", error });
  }
};
