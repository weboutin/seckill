const Product = require('./models/product');
const Order = require('./models/order');
const RedisClient = require('./getRedisInstance');
const { KEY_ORDERS, KEY_PRODUCT_STOCK } = require('./models/rediskey');

async function init(stock) {
  //refresh MySQL
  await Order.sync({ force: true })
  await Product.sync({ force: true })

  //refresh Redis
  await RedisClient.delAsync(KEY_ORDERS);
  await RedisClient.delAsync(KEY_PRODUCT_STOCK);

  //init MySQL data
  await Product.create({
    title: '代购买商品',
    stock: stock
  })

  //init Redis data
  await RedisClient.hmsetAsync(KEY_PRODUCT_STOCK, {
    "stock": stock,
    "booked": 0
  })
}

module.exports = init;
