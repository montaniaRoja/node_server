'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Usuario extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  Usuario.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'tbl_usuarios',
  });

  return Usuario;
};
