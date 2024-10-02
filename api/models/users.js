const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(50)
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(200)
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(200)
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING(500)
        },
        phone_number: {
            allowNull: false,
            type: DataTypes.STRING(50)
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING(50)
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        tableName: 'users',
        timestamps: false,
    });

    Users.associate = (models) => {
        Users.belongsToMany(models.Items, { through: models.Carts });
        Users.belongsToMany(models.Items, { through: models.Likes });
        Users.belongsToMany(models.Items, { through: models.Orders });
    }

    return Users;
}