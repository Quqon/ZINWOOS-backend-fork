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
        }
    }, {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Users.associate = (models) => {
        Users.belongsToMany(models.Items, { through: models.Carts });
        Users.belongsToMany(models.Items, { through: models.Likes });
        Users.belongsToMany(models.Items, { through: models.Orders });
    }

    return Users;
}