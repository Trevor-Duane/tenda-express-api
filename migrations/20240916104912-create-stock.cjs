'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // inventory_id: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "inventory",
      //     key: "id"
      //   }

      // },
      stock_item: {
        allowNull: false,
        type: Sequelize.STRING
      },
      uom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      portions_in_stock: {
        allowNull: false,
        type: Sequelize.INTEGER

      },
      portion_price: {
        allowNull: false,
        type: Sequelize.INTEGER

      },
      stock_price: {
        allowNull: false,
        type: Sequelize.INTEGER

      },
      reorder_level: {
        allowNull: false,
        type: Sequelize.INTEGER

      },
      section: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tag: {
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
    await queryInterface.dropTable('stock');
  }
};