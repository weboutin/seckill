const Product = require('./models/product');
const Order = require('./models/order');

async function init(stock) {
  //refresh
  await Order.sync({ force: true })
  await Product.sync({ force: true })
  //init data
  await Product.create({
    title: '代购买商品',
    stock: stock
  })
}

module.exports = init;
