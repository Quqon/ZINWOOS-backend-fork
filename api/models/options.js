module.exports = (sequelize, DataTypes) => {
    const Options = sequelize.define('Options', {
        name: {
            allowNull: false,
            type: DataTypes.STRING(50),
        },
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL(8, 1)
        }
    }, {
        tableName: 'options',
        timestamps: false
    }
    );

    Options.associate = (models) => {
        Options.belongsToMany(models.Items, { through: models.Options_items, as: 'items' })
    }

    return Options;
}