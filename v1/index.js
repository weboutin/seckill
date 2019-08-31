const Order = require('./model/order');
const sequelize = require('./model/getInstance')

sequelize.sync()
  .then(() => Order.create({
    uid: 'itgo'
  }))
  .then(order => {
    console.log(order.toJSON());
  });
