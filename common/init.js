const Product = require('./models/product');
const Order = require('./models/order');
const RedisClient = require('./getRedisInstance');
const { KEY_ORDERS } = require('./models/rediskey');

async function init(stock) {
  //refresh
  await Order.sync({ force: true })
  await Product.sync({ force: true })

  await RedisClient.delAsync(KEY_ORDERS);

  //init data
  await Product.create({
    title: '代购买商品',
    stock: stock
  })
}

module.exports = init;
