const Product = require('../model/product');
const Order = require('../model/order');

module.exports = () => {
  Order.sync({ force: true })

  Product.sync({ force: true }).then(() => {
    Product.create({
      title: '代购买商品',
      stock: 2
    })
  })
}
