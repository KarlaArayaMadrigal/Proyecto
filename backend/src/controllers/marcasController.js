const { Marca } = require('../models');

exports.getMarcas = async (req, res) => {
  try {
    const marcas = await Marca.findAll();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener marcas", error });
  }
};

exports.getMarcaById = async (req, res) => {
  try {
    const marca = await Marca.findByPk(req.params.id_marca);
    if (!marca) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }
    res.json(marca);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la marca", error });
  }
};

exports.createMarca = async (req, res) => {
  try {
    const { nombre_marca } = req.body;
    const marca = await Marca.create({ nombre_marca });
    res.status(201).json(marca);
  } catch (error) {
    res.status(500).json({ message: "Error al crear marca", error });
  }
};

exports.updateMarca = async (req, res) => {
  try {
    const { nombre_marca } = req.body;
    const marca = await Marca.findByPk(req.params.id_marca);
    if (!marca) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }
    marca.nombre_marca = nombre_marca;
    await marca.save();
    res.json(marca);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar marca", error });
  }
};

exports.deleteMarca = async (req, res) => {
  try {
    const marca = await Marca.findByPk(req.params.id_marca);
    if (!marca) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }
    await marca.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar marca", error });
  }
};
