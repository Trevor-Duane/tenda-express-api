'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inventory_date: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
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
        type: Sequelize.STRING

      },
      section: {
        allowNull: false,
        type: Sequelize.STRING

      },
      uom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      quantity_recieved: {
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
    await queryInterface.dropTable('inventory');
  }
};