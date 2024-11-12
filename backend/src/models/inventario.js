module.exports = (sequelize, DataTypes) => {
    const Inventario = sequelize.define('Inventario', {
      id_inventario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tipo_prenda: { type: DataTypes.STRING },
      cantidad: { type: DataTypes.INTEGER },
      precio: { type: DataTypes.FLOAT }
    });
    return Inventario;
  };
  