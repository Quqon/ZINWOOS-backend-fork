module.exports = (sequelize, DataTypes) => {
    const Options_items = sequelize.define('Options_items', {
        item_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'items',
                key: 'id'
            }
        },
        option_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'options',
                key: 'id'
            }
        }
    }, {
        tableName: 'options_items'
    })

    return Options_items;
}
