import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Payment = db.define('payments', {
  order_id: {
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  amount: {
    type: DataTypes.STRING
  },
  payment_method: {
    type: DataTypes.STRING
  },
  transaction_id: {
    type: DataTypes.STRING
  },
  payment_date: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.STRING
  },
},
  {
    freezeTableName: true
  });
export default Payment
