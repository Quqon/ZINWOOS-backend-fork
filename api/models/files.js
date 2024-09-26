const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Files = sequelize.define('files', {
    filePath: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Files;