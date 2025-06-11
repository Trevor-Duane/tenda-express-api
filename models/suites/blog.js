import { Sequelize } from 'sequelize';
import db from '../../config/database.js'

const { DataTypes } = Sequelize

const suitesBlogs = db.define('suites_blogs', {
  title: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATEONLY
  },
  body: {
    type: DataTypes.TEXT
  },
  slug: {
    type: DataTypes.STRING
  },
  cover: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING
  },
},
{
  freezeTableName:true
}); 
export default suitesBlogs
