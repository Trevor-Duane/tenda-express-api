'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class portioned_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  portioned_stock.init({
    item: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'portioned_stock',
  });
  return portioned_stock;
};