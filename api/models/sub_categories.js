const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Sub_categories = sequelize.define('Sub_categories', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        }
        ,
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

    Sub_categories.associate = (models) => {
        Sub_categories.hasMany(models.Items, { foreignKey: 'sub_category_id' }); // FK 추가
    }

    return Sub_categories;
}