import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize

const Request = db.define('requests', {
  fullName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  viewedCourse: {
    type: DataTypes.STRING
  },
  additionInfo: {
    type: DataTypes.STRING
  },
},
  {
    freezeTableName: true
  });

export default Request
