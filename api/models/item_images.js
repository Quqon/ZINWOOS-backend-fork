const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Items = require('../models/items')

const Item_images = sequelize.define('item_images', {
    name: {
        allowNull: false,
        type: DataTypes.STRING(50)
    },
    image_URL: {
        allowNull: false,
        type: DataTypes.STRING(1000)
    },
    item_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'Items',
            key: 'sub_category_id'
        }
    }
}, {
    timestamps: false
});

Item_images.associate = (models) => {
    Item_images.belongsTo(models.Items, { foreignKey: 'item_id', targetKey: 'sub_category_id', as: 'Items' })
}

module.exports = Item_images;