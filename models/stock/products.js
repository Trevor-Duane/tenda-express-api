import { Sequelize } from 'sequelize';
import db from '../../config/database.js'

const { DataTypes } = Sequelize

const Product = db.define('products', {
  stock_id: {
    type: DataTypes.STRING
  },
  product_name: {
    type: DataTypes.STRING
  },
  product_ingredients: {
    type: DataTypes.TEXT
  },
  product_serving_size: {
    type: DataTypes.INTEGER
  },
  product_prep_time: {
    type: DataTypes.INTEGER
  },
  product_cost_price: {
    type: DataTypes.INTEGER
  },
},
{
  freezeTableName: true
});

export default Product




