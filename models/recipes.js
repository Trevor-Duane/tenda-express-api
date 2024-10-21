import { Sequelize } from "sequelize"
import db from "../config/database.js"
import Store from "./store.js";

const { DataTypes } = Sequelize

const Recipe = db.define('recipe', {
  product_id: {
    type: DataTypes.INTEGER
  },
  store_id: {
    type: DataTypes.INTEGER
  },
  usage_amount: {
    type: DataTypes.INTEGER
  },
  uom: {
    type: DataTypes.STRING
  },
},

{
  freezeTableName: true
});

export default Recipe

