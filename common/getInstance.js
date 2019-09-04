const Sequelize = require('sequelize');
const Config = require('../config');
const sequelize = new Sequelize(Config.mysql.dbname, Config.mysql.user, Config.mysql.password, {
  dialect: 'mysql'
});


module.exports = sequelize;
