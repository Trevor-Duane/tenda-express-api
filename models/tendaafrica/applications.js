import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize

const Application = db.define('applications', {
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
},
  {
    freezeTableName: true
  });

export default Application
