const Sequelize = require('sequelize')
const sequelize = require('../getInstance')

class Order extends Sequelize.Model { }
Order.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, { sequelize, modelName: 'order' });


module.exports = Order
