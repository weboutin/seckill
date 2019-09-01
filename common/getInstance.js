
const Sequelize = require('sequelize');
const sequelize = new Sequelize('seckill', 'root', 'root', {
  dialect: 'mysql'
});


module.exports = sequelize;
