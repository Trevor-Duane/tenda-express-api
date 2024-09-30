'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "stocks",
          key: "id"
        }
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      product_ingredients: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      product_serving_size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      product_prep_time: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      product_cost_price: {
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
    await queryInterface.dropTable('products');
  }
};