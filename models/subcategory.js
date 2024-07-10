import { Sequelize } from 'sequelize';
import db from '../config/database.js'
import Category from './category.js';

const { DataTypes } = Sequelize

const Subcategory = db.define('subcategorys', {
  subcategory_name: {
    type: DataTypes.STRING
  },
  category_id: {
    type: DataTypes.INTEGER,
    references:{
      model: Category,
      key: 'id'
    }
  }, 
  subcategory_status: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
  freezeTableName:true
}); 

export default Subcategory