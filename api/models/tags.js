module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define('Tags', {
        name: {
            allowNull: false,
            type: DataTypes.STRING(50),
        }
    }, {
        tableName: 'tags',
        timestamps: false
    })

    Tags.associate = (models) => {
        Tags.belongsToMany(models.Items, { through: models.Tags_items })
    }



    return Tags;
}