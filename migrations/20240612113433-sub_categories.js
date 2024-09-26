'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await (queryInterface.createTable('sub_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
        // unique: true
      },
      main_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'main_categories',
          key: 'id'
        }
      }
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sub_categories')
  }
}