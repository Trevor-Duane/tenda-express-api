import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const rolePermissions = db.define('role_permissions', {
  role_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },

  permission_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
},
  {
    freezeTableName: true
  });


export default rolePermissions
