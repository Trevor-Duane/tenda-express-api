import { Sequelize } from 'sequelize';
import db from '../../config/database.js'

const { DataTypes } = Sequelize

const suitesServices = db.define('suites_services', {
  title: {
    type: DataTypes.STRING
  },
  icon: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
},
{
  freezeTableName:true
}); 
export default suitesServices
