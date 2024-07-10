import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Category = db.define('categorys', {
  category_name: {
    type: DataTypes.STRING
  },
    category_image: {
      type: DataTypes.BLOB
    },
    category_description: {
      type: DataTypes.STRING
    },  
},
{
  freezeTableName:true
});

export default Category
