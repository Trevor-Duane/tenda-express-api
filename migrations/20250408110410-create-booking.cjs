'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suites_bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateIn: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      dateOut: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      guests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      room: {
        allowNull: false,
        type: Sequelize.STRING
      },
      first_name:{
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name:{
        allowNull: false,
        type: Sequelize.STRING
      },
      phone:{
        allowNull: false,
        type: Sequelize.STRING
      },
      email:{
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suites_bookings');
  }
};