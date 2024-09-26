'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await (queryInterface.createTable('item_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      image_URL: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      item_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id'
        }
      }
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await (queryInterface.dropTable('item_images'))
  }
}