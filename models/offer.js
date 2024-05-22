import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Offer = db.define('offers', {
  offer_title: {
    type: DataTypes.STRING
  },
    offer_body: {
      type: DataTypes.TEXT
    },
    offer_cover: {
      type: DataTypes.BLOB
    },
    offer_date: {
      type: DataTypes.DATE
    },   
},
{
  freezeTableName:true
}); 
export default Offer
