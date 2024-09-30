import { Sequelize } from 'sequelize';
import db from '../../config/database.js'

const { DataTypes } = Sequelize

const StockMovement = db.define('stock_movement', {
  stock_item: {
    type: DataTypes.STRING
  },
  from_stock_id: {
    type: DataTypes.INTEGER
  },
  to_stock_id: {
    type: DataTypes.INTEGER
  },
  movement_type: {
    type: DataTypes.STRING
  },
  quantity: {
    type: DataTypes.INTEGER
  },
},
{
  freezeTableName: true
});

export default StockMovement

