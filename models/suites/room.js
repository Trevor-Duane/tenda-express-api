import { Sequelize } from 'sequelize';
import db from '../../config/database.js'

const { DataTypes } = Sequelize

const suitesRooms = db.define('suites_rooms', {
  name: {
    type: DataTypes.STRING
  },
  rate: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.STRING
  },
  capacity: {
    type: DataTypes.INTEGER
  },
  bed: {
    type: DataTypes.INTEGER
  },
    description: {
    type: DataTypes.TEXT
  }
},
{
  freezeTableName:true
}); 
export default suitesRooms
