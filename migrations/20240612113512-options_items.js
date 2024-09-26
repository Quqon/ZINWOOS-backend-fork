'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await (queryInterface.createTable('options_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id'
        }
      },
      option_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'options',
          key: 'id'
        }
      }
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await (queryInterface.dropTable('options_items'))
  }
}