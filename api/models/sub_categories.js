module.exports = (sequelize, DataTypes) => {
    const Sub_categories = sequelize.define('Sub_categories', {
        name: {
            allowNull: false,
            type: DataTypes.STRING(50)
        },
        main_category_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'main_categories',
                key: 'id'
            }
        }
    }, {

        timestamps: false
    });

    return Sub_categories;
}