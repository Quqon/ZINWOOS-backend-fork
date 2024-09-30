const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('Items', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(50),
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING(1000)
        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL(8, 1)
        },
        detail: {
            allowNull: true,
            type: DataTypes.STRING(3000)
        },
        detail_image: {
            allowNull: true,
            type: DataTypes.STRING(1000)
        },
        sub_category_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Sub_categories',
                key: 'id'
            }
        },
        max_amount: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED
        },
        stock: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED
        }
    }, {
        tableName: 'items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Items.associate = (models) => {
        Items.belongsToMany(models.Main_categories, { through: models.Sub_categories });
        Items.belongsToMany(models.Options, { through: models.Options_items });
        Items.belongsToMany(models.Tags, { through: models.Tags_items });
        Items.belongsToMany(models.Users, { through: models.Carts });
        Items.belongsToMany(models.Users, { through: models.Likes });
        Items.belongsToMany(models.Users, { through: models.Orders });
        Items.belongsToMany(models.Tags, { through: models.Tags_items });
    }

    return Items;
}