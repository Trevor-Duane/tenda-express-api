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
      inventory_item: {
        allowNull: false,
        type: Sequelize.STRING

      },
      section: {
        allowNull: false,
        type: Sequelize.STRING

      },
      tags: {
        allowNull: false,
        type: Sequelize.STRING

      },
      uom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      unit_price: {
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