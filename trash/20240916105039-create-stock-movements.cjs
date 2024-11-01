'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_movement', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock_item: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      from_stock_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "stock",
          key: "id"
        }
      },
      to_stock_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "stock",
          key: "id"
        }
      },
      movement_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('stock_movement');
  }
};