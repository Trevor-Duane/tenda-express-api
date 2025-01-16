import { Sequelize } from "sequelize"
import db from "../config/database.js";

const { DataTypes } = Sequelize

const VerificationCodes = db.define('verification_codes', {
  userId: {
    type: DataTypes.INTEGER
  },
  code: {
    type: DataTypes.STRING
  },
},
{
  freezeTableName: true
});

export default VerificationCodes

