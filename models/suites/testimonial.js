import { Sequelize } from 'sequelize';
import db from '../../config/database.js'

const { DataTypes } = Sequelize

const suitesTestimonials = db.define('suites_testimonials', {
  client_alias: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  room_rating: {
    type: DataTypes.INTEGER
  },
},
{
  freezeTableName:true
}); 
export default suitesTestimonials
