'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await (queryInterface.createTable('main_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(1000)
      }
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('main_categories')
  }
}