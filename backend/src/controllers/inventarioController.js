const { Inventario } = require('../models');

exports.getInventario = async (req, res) => {
  try {
    const inventarios = await Inventario.findAll();
    res.json(inventarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener inventarios", error });
  }
};

exports.getInventarioById = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id_inventario);
    if (!inventario) {
      return res.status(404).json({ message: "Inventario no encontrado" });
    }
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el inventario", error });
  }
};

exports.createInventario = async (req, res) => {
  try {
    const { tipo_prenda, cantidad, precio } = req.body;
    const inventario = await Inventario.create({ tipo_prenda, cantidad, precio });
    res.status(201).json(inventario);
  } catch (error) {
    res.status(500).json({ message: "Error al crear inventario", error });
  }
};

exports.updateInventario = async (req, res) => {
  try {
    const { tipo_prenda, cantidad, precio } = req.body;
    const inventario = await Inventario.findByPk(req.params.id_inventario);
    if (!inventario) {
      return res.status(404).json({ message: "Inventario no encontrado" });
    }
    inventario.tipo_prenda = tipo_prenda;
    inventario.cantidad = cantidad;
    inventario.precio = precio;
    await inventario.save();
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar inventario", error });
  }
};

exports.deleteInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id_inventario);
    if (!inventario) {
      return res.status(404).json({ message: "Inventario no encontrado" });
    }
    await inventario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar inventario", error });
  }
};
