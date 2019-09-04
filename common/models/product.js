const Sequelize = require('sequelize')
const sequelize = require('../getInstance')

class Product extends Sequelize.Model { }
Product.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    description: '商品标题',
    type: Sequelize.STRING,
    allowNull: false
  },
  stock: {
    description: '商品库存',
    type: Sequelize.INTEGER,
    allowNull: false
  }

}, { sequelize, modelName: 'product' });


module.exports = Product
