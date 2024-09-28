const { Sequelize } = require('sequelize');
// const config = require('./config.json');

// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3000,
    dialectOptions: {
        connectTimeout: 60000
    }
});

module.exports = sequelize;