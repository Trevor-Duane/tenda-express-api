import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Permissions = db.define('permissions', {
  Permission_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull:false,
    type: DataTypes.TEXT
  }
},
  {
    freezeTableName: true
  });

export default Permissions
