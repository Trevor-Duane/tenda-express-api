'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addendum_budgets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      budget_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "budget",
          key: "id"
        }
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      addendum_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      remarks: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "new",
      },
      created_by: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('addendum_budgets');
  }
};