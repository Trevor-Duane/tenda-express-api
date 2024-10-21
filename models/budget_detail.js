import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const budgetDetail = db.define('budget_detail', {
  budget_id: {
    type: DataTypes.INTEGER
  },
  item_name: {
    type: DataTypes.STRING
  },
  uom: {
    type: DataTypes.STRING
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  unit_price: {
    type:DataTypes.STRING
  },
  total: {
    type: DataTypes.STRING
  },
  section: {
    type: DataTypes.STRING
  }
},
{
  freezeTableName: true
});

export default budgetDetail