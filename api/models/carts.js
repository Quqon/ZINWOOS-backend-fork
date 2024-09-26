const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define('Carts', {
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
        },
        option_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'options',
                key: 'id'
            }
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        checkbox: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    }, {
        tableName: 'carts',
        timestamps: false
    })

    return Carts;
}