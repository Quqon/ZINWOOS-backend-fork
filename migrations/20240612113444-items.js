'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await (queryInterface.createTable('items', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(1000)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(8, 1)
      },
      detail: {
        allowNull: true,
        type: Sequelize.STRING(3000)
      },
      detail_image: {
        allowNull: true,
        type: Sequelize.STRING(1000)
      },
      sub_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sub_categories',
          key: 'id'
        }
      },
      max_amount: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items')
  }
}