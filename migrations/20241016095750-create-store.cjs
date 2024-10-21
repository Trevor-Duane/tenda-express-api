'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('store', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shopping_list_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "shopping_list",
          key: "id"
        }
      },
      item_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      section: {
        allowNull: false,
        type: Sequelize.STRING
      },
      uom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      amount_in_store: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      reorder_level: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1000
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
    await queryInterface.dropTable('store');
  }
};