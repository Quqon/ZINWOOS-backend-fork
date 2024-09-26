'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await (queryInterface.createTable('options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(8, 1)
      }
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('options')
  }
}