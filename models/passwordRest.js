import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const PasswordRest = db.define('password_resets', {
  email: {
    type: DataTypes.STRING
  },
  reset_token: {
    type: DataTypes.TEXT
  },
  expiresAt: {
    type: DataTypes.DATE
  },
  ip_address: {
    type: DataTypes.STRING
  },
  user_agent: {
    type: DataTypes.STRING
  },
},
  {
    freezeTableName: true
  });
export default PasswordRest
