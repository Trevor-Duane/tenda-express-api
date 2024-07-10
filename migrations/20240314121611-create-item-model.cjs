'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subcategory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "subcategorys",
          key: "id"
        }
      },
      item_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      item_price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      item_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      item_rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      item_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      item_status:{
        type: Sequelize.STRING,
        defaultValue: "active",
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  }
};