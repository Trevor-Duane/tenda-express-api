import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Address = db.define('addresses', {
  user_id: {
  type: DataTypes.INTEGER
},
  address: {
  type: DataTypes.STRING
},
  landmark: {
  type: DataTypes.STRING
},
  address_latitude: {
  type: DataTypes.DOUBLE
},
  address_longitude: {
  type: DataTypes.DOUBLE
}, 
},
{
  freezeTableName: true
});

export default Address
