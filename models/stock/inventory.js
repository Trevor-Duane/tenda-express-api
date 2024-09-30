import { Sequelize } from "sequelize"
import db from "../../config/database.js"

const { DataTypes } = Sequelize

const Inventory = db.define('inventory', {
  inventory_item: {
    type: DataTypes.STRING
  },
  section: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.STRING
  },
  uom: {
    type: DataTypes.STRING
  },
  unit_price: {
    type: DataTypes.INTEGER
  }
},

{
  freezeTableName: true
});

export default Inventory

