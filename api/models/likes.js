const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        item_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'items',
                key: 'id'
            }
        }
    }, {
        tableName: 'likes',
        timestamps: false
    })

    return Likes;
}