'use strict';
import { Sequelize } from 'sequelize';
import db from '../config/database.js'
import Subcategory from './subcategory.js';

const { DataTypes } = Sequelize

const Item = db.define('items', {
  subcategory_id: {
    type: DataTypes.INTEGER,
    references:{
      model: Subcategory,
      key: 'id'
    }
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

export default Item