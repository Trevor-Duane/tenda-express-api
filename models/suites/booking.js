import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize

const suitesBookings = db.define('suites_bookings', {
  dateIn: {
    type: DataTypes.DATEONLY
  },
  dateOut: {
    type: DataTypes.DATEONLY
  },
  guests: {
    type: DataTypes.INTEGER
  },
  room: {
    type: DataTypes.STRING
  },
  first_name:{
    type: DataTypes.STRING
  },
  last_name:{
    type: DataTypes.STRING
  },
  phone:{
    type: DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING
  },
},
{
  freezeTableName:true
}); 
export default suitesBookings
