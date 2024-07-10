'use strict';
import { Sequelize } from 'sequelize';
import subcategory from './subcategory.js'
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Item = db.define('items', {
  subcategory_id: {
    type: DataTypes.INTEGER
  },
  item_name: {
    type: DataTypes.STRING
  },
  item_price: {
    type: DataTypes.STRING
  },
  item_image: {
    type: DataTypes.BLOB
  },
  item_rating: {
    type: DataTypes.INTEGER
  },
  item_description: {
    type: DataTypes.STRING
  },
  item_status: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
  {
    freezeTableName: true
  });

Item.belongsTo(subcategory, { foreignKey: 'subcategory_id' });

export default Item
