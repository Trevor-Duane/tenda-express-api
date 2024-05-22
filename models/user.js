import { Sequelize } from 'sequelize';
import db from '../config/database.js'

const { DataTypes } = Sequelize

//fillable fields of the model
const User = db.define('users', {
    user_role: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    mobile: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    profile_image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
    },
    // confirm_password: {
    //   type: DataTypes.STRING,
    // },
    isVerified: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  },
  {
    freezeTableName:true
  }); 

  export default User