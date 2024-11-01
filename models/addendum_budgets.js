import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const addendumBudget = db.define('addendum_budgets', {
  budget_id: {
    type: DataTypes.INTEGER
  },
  date: {
    type: DataTypes.DATEONLY
  },
  addendum_amount: {
    type: DataTypes.INTEGER
  },
  remarks:{
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING
  },
  created_by: {
    type:DataTypes.STRING
  }
},
{
  freezeTableName: true,
});

export default addendumBudget