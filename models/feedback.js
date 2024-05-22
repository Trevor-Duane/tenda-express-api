import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Feedback = db.define('feedbacks', {
  customer_id: {
    type: DataTypes.INTEGER
  },
  contact: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  order_id: {
    type: DataTypes.INTEGER
  },
  feedback: {
    type: DataTypes.TEXT
  },
},
  {
    freezeTableName: true
  });

export default Feedback
