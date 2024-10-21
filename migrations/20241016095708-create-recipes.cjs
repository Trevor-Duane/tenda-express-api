'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "items",
          key: "id"
        }
      },
      store_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "store",
          key: "id"
        }
      },
      usage_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      uom: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "g",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipe');
  }
};