import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Role = db.define('roles', {
  user_role: {
    type: DataTypes.INTEGER
  },
  role_name: {
    type: DataTypes.STRING
  },
},
  {
    freezeTableName: true
  });
export default Role
