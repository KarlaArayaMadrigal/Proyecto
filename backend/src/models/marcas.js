module.exports = (sequelize, DataTypes) => {
    const Marca = sequelize.define('Marca', {
      id_marca: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre_marca: { type: DataTypes.STRING }
    });
    return Marca;
  };
  