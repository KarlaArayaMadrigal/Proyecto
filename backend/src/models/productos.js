module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
      id_producto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre_producto: { type: DataTypes.STRING },
      precio: { type: DataTypes.FLOAT },
      cantidad: { type: DataTypes.INTEGER },
      id_marca: { type: DataTypes.INTEGER, references: { model: 'Marcas', key: 'id_marca' } }
    });
    return Producto;
  };
  