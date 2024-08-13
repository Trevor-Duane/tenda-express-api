import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const finishedOrder = db.define('finished_orders', {
  user_id: {
    type: DataTypes.INTEGER
  },
    username: {
      type: DataTypes.STRING
  },
    mobile: {
      type: DataTypes.STRING
    },
    order_status: {
      type: DataTypes.STRING
    },
    order_type: {
      type: DataTypes.STRING
    },   
    payment_mode: {
      type: DataTypes.STRING
    },
    payment_status: {
      type: DataTypes.STRING
    },
    order_items: {
      type: DataTypes.JSON
    },
    order_total: {
      type: DataTypes.STRING
    },
    delivery_fee: {
      type: DataTypes.STRING
    },
    delivery_latitude: {
      type: DataTypes.STRING
    },
    delivery_longitude: {
      type: DataTypes.STRING
    }
},
{
  freezeTableName:true
}); 
export default finishedOrder

