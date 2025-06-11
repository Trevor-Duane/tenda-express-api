import { Sequelize } from 'sequelize';
import db from '../../config/database.js'

const { DataTypes } = Sequelize

const suitesGallery = db.define('suites_gallery', {
  title: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
},
{
  freezeTableName:true
}); 
export default suitesGallery
