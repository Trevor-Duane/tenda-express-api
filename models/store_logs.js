import { Sequelize } from "sequelize"
import db from "../config/database.js";
import Recipe from "./recipes.js";

const { DataTypes } = Sequelize

const StoreLog = db.define('store_logs', {
  kot: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  out_date: {
    allowNull: false,
    type: DataTypes.DATEONLY
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  item_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  product_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  product_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  section: {
    allowNull: false,
    type: DataTypes.STRING
  },
  usage_amount: {
    allowNull: false,
    type: DataTypes.STRING
  },
  uom: {
    allowNull: false,
    type: DataTypes.STRING
  },
  leftin_store: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING
  }
},

{
  freezeTableName: true
});

export default StoreLog

