'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment_mode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "false"
      },
      order_items: {
        type: Sequelize.JSON,
        allowNull: false
      },
      order_total: {
        type: Sequelize.STRING,
        allowNull: false
      },
      delivery_fee: {
        type: Sequelize.STRING,
        allowNull: false
      },
      delivery_latitude: {
        type: Sequelize.STRING,
        allowNull: false
      },
      delivery_longitude: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('orders');
  }
};