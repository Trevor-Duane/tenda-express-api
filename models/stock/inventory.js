import { Sequelize } from "sequelize"
import db from "../../config/database.js"

const { DataTypes } = Sequelize

const Inventory = db.define('inventory', {
  shopping_list_id: {
    type: DataTypes.INTEGER
  },
  inventory_date: {
    type: DataTypes.DATEONLY
  },
  item_name: {
    type: DataTypes.STRING
  },
  section: {
    type: DataTypes.STRING
  },
  uom: {
    type: DataTypes.STRING
  },
  quantity_recieved: {
    type: DataTypes.INTEGER
  }
},

  {
    freezeTableName: true
  });

export default Inventory

