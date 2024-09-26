module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders', {
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
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'orders'
    })

    return Orders;
}