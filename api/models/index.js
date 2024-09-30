'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Main_categories = require('./main_categories')(sequelize, DataTypes);
db.Sub_categories = require('./sub_categories')(sequelize, DataTypes);
db.Items = require('./items')(sequelize, DataTypes);
db.Options = require('./options')(sequelize, DataTypes);
db.Options_items = require('./options_items')(sequelize, DataTypes);
db.Users = require('./users')(sequelize, DataTypes);
db.Carts = require('./carts')(sequelize, DataTypes);
db.Likes = require('./likes')(sequelize, DataTypes);
db.Orders = require('./orders')(sequelize, DataTypes);
db.Tags = require('./tags')(sequelize, DataTypes);
db.Tags_items = require('./tags_items')(sequelize, DataTypes);

db.Items.belongsToMany(db.Options, { through: db.Options_items, foreignKey: 'item_id', as: 'options' });
db.Options.belongsToMany(db.Items, { through: db.Options_items, foreignKey: 'option_id', as: 'optionsItems' });

db.Users.belongsToMany(db.Items, { through: db.Carts, foreignKey: 'user_id', as: 'cartsUsers' });
db.Items.belongsToMany(db.Users, { through: db.Carts, foreignKey: 'item_id', as: 'cartsItems' });

db.Users.belongsToMany(db.Items, { through: db.Likes, foreignKey: 'user_id', as: 'likedUsers' });
db.Items.belongsToMany(db.Users, { through: db.Likes, foreignKey: 'item_id', as: 'likedItems' });

db.Users.belongsToMany(db.Items, { through: db.Orders, foreignKey: 'user_id', as: 'orderedUsers' });
db.Items.belongsToMany(db.Users, { through: db.Orders, foreignKey: 'item_id', as: 'orderedItems' });

db.Carts.belongsTo(db.Items, { foreignKey: 'item_id' });
db.Items.hasMany(db.Carts, { foreignKey: 'item_id' });

db.Carts.belongsTo(db.Options, { foreignKey: 'option_id' });
db.Options.hasMany(db.Carts, { foreignKey: 'option_id' });

db.Main_categories.belongsToMany(db.Items, { through: db.Sub_categories, foreignKey: 'main_category_id', as: 'subMain' });
db.Items.belongsToMany(db.Main_categories, { through: db.Sub_categories, foreignKey: 'id', as: 'subItems' });

db.Tags.belongsToMany(db.Items, { through: db.Tags_items, foreignKey: 'tag_id', as: 'tags_items_Tags' });
db.Items.belongsToMany(db.Tags, { through: db.Tags_items, foreignKey: 'item_id', as: 'tags_items_Items' });

module.exports = db;
