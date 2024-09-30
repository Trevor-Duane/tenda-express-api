import { Sequelize } from "sequelize"
import db from "../../config/database.js"

const { DataTypes } = Sequelize

const Stock = db.define('stock', {

  // inventory_id: {
  //   type: DataTypes.INTEGER
  // },
  stock_item: {
    type: DataTypes.STRING
  },
  uom: {
    type: DataTypes.STRING
  },
  portions_in_stock: {
    type: DataTypes.INTEGER
  },
  portion_price: {
    type: DataTypes.INTEGER
  },
  stock_price: {
    type: DataTypes.INTEGER
  },
  reorder_level: {
    type: DataTypes.INTEGER
  },
  section: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  tag: {
    type: DataTypes.STRING
  },
},
{
  freezeTableName: true,
  hooks: {
    beforeSave: (stock) => {
      stock.stock_price = stock.portions_in_stock * stock.portion_price;
    }
  }
});
export default Stock