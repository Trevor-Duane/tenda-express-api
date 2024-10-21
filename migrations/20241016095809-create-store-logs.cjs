'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('store_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      out_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      item_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: "id"
        }
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      section: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usage_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      uom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      leftin_store:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      username:{
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('store_logs');
  }
};