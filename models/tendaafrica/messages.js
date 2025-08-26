import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize

const Message = db.define('messages', {
    name: {
        type: DataTypes.STRING
    },
    subject: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.TEXT
    },
},
    {
        freezeTableName: true
    });

export default Message
