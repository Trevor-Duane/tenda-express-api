import { Sequelize } from "sequelize"
import db from "../config/database.js";

const { DataTypes } = Sequelize

const Sales = db.define('sales', {
  kot: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  sale_date: {
    allowNull: false,
    type: DataTypes.DATEONLY
  },
  item_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  item_price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.STRING
  }
},

{
  freezeTableName: true
});

export default Sales

