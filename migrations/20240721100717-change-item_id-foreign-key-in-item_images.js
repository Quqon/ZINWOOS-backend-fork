'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint('item_images', {
      fields: ['item_id'],
      type: 'foreign key',
      name: 'item_images_item_id_fkey',
      references: {
        table: 'items',
        field: 'sub_category_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('item_images', 'item_images_item_id_fkey')

    await queryInterface.addConstraint('item_images', {
      fields: ['item_id'],
      type: 'foreign key',
      name: 'item_images_item_id_fkey',
      references: {
        table: 'items',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  }
};
