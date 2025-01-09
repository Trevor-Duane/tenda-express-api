'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('budget', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      budget_head: {
        allowNull: false,
        type: Sequelize.STRING
      },
      from_date: {
        allowNull: false,
        type: Sequelize.DATEONLY

      },
      to_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      budget_total: {
        allowNull: false,
        type: Sequelize.INTEGER

      },
      created_by: {
        allowNull: false,
        type: Sequelize.STRING
      },
      budget_status: {
        allowNull: false,
        type:Sequelize.STRING,
        defaultValue: "New",
      },
      remarks:{
        allowNull: true,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('budget');
  }
};