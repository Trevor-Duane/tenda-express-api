import { Sequelize } from "sequelize"
import db from "../config/database.js";

const { DataTypes } = Sequelize

const shoppingList = db.define('shopping_list', {
  item_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  section: {
    allowNull:false,
    type: DataTypes.STRING
  },
  uom: {
    allowNull: false,
    type: DataTypes.STRING
  },
  unit_price: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
},

{
  freezeTableName: true
});

export default shoppingList

