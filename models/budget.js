import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Budget = db.define('budget', {
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
    type: DataTypes.TEXT
  },
  UpdatedAt: {
    type:DataTypes.DATE
  }
},
{
  freezeTableName: true,
});


export default Budget