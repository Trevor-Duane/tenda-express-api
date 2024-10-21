import { Sequelize } from "sequelize"
import db from "../config/database.js";
import Recipe from "./recipes.js";

const { DataTypes } = Sequelize

const Store = db.define('store', {
  item_name: {
    type: DataTypes.STRING
  },
  section: {
    type: DataTypes.STRING
  },
  uom: {
    type: DataTypes.STRING
  },
  amount_in_store: {
    type: DataTypes.INTEGER
  },
  reorder_level: {
    type: DataTypes.INTEGER
  }
},

{
  freezeTableName: true
});

export default Store

