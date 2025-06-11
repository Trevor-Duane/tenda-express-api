'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('app_stock_additions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock_item_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "app_stock_items",
          key: "id"
        },
      },
      recieved_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      department: {
        allowNull: false,
        type: Sequelize.ENUM('kitchen', 'bar', 'service')
      },
      recieved_by: {
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
    await queryInterface.dropTable('app_stock_additions');
  }
};