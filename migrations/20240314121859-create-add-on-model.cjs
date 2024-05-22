'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "items",
          key: 'id'
        }
      },
      addon_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addon_price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addon_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addon_rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      addon_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addon_status: {
        type: Sequelize.STRING,
        defaultValue: "active",
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('addons');
  }
};