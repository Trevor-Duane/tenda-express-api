'use strict';
import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Addon = db.define('addons', {
  item_id: {
    type: DataTypes.INTEGER
  },
  addon_name: {
    type: DataTypes.STRING
  },
  addon_price: {
    type: DataTypes.STRING
  },
  addon_image: {
    type: DataTypes.BLOB
  },
  addon_rating: {
    type: DataTypes.INTEGER
  },
  addon_description: {
    type: DataTypes.STRING
  },
  addon_status: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
  {
    freezeTableName: true
  });
export default Addon
