'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('app_daily_stock_entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock_item_id: {
        type: Sequelize.INTEGER,
        references:{
          model: "app_stock_items",
          key: "id"
        },
      },
      entry_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      opening_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      closing_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      department: {
        allowNull: false,
        type: Sequelize.ENUM('kitchen', 'bar', 'service')

      },
      entered_by: {
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
    await queryInterface.dropTable('app_daily_stock_entries');
  }
};