module.exports = (sequelize, DataTypes) => {
    const Tags_items = sequelize.define('Tags_items', {
        tag_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'tags',
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
        tableName: 'tags_items',
        timestamps: false
    })

    return Tags_items;
}