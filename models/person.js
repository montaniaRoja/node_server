'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Person extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  Person.init({
    personname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Person',
    tableName: 'tbl_persons',
  });

  return Person;
};
