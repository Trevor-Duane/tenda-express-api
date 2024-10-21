import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const BudgetDraft = db.define('budget_drafts', {
  budget_head: {
    type: DataTypes.STRING
  },
  from_date: {
    type: DataTypes.DATEONLY
  },
  to_date: {
    type: DataTypes.DATEONLY
  },
  budget_total: {
    type: DataTypes.INTEGER
  },
  created_by: {
    type:DataTypes.STRING
  },
  budget_status: {
    type: DataTypes.STRING
  },
  remarks:{
    type: DataTypes.STRING
  },
  // UpdatedAt: {
  //   type:DataTypes.DATE
  // }
},
{
  freezeTableName: true,
});

export default BudgetDraft