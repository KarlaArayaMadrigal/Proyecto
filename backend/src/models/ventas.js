module.exports = (sequelize, DataTypes) => {
    const Venta = sequelize.define('Venta', {
      id_venta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fecha_venta: { type: DataTypes.DATE },
      precio: { type: DataTypes.FLOAT }
    });
    return Venta;
  };
  