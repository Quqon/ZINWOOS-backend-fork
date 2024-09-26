'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('options_items', 'options_items_ibfk_1');

    await queryInterface.addConstraint('options_items', {
      fields: ['item_id'],
      type: 'foreign key',
      name: 'options_items_id_fk_cascade',
      references: {
        table: 'items',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('options_items', 'options_items_id_fk_cascade');

    await queryInterface.addConstraint('options_items', {
      fields: ['item_id'],
      type: 'foreign key',
      name: 'options_items_ibfk_1',
      references: {
        table: 'items',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })
  }
};
