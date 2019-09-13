const Product = require('../common/models/product');
const Order = require('../common/models/order');
const assert = require('assert')
const chalk = require('chalk');
const RedisClient = require('../common/getRedisInstance')
const { KEY_ORDERS, KEY_PRODUCT_STOCK } = require('../common/models/rediskey')

/**
 * MySQL 处理减库存和生成订单
 */
exports.MySQLOnlyAssert = async (preDefined_stock, preDefined_productId) => {
  try {
    const { stock } = (await Product.findOne({ productId: preDefined_productId })).toJSON()
    //商品库存为0
    assert.equal(stock, 0);
    const ordersCount = await Order.count();
    //订单量等于库存量
    assert.equal(ordersCount, preDefined_stock);
    console.log(`${chalk.green('Success')}`);
  } catch (e) {
    console.log(`${chalk.red('Fail')}`);
    console.log(e)
  }
}


/**
 * Redis 处理订单
 */
exports.RedisOrderAssert = async (preDefined_stock, preDefined_productId) => {
  try {
    const { stock } = (await Product.findOne({ productId: preDefined_productId })).toJSON()
    //商品库存为0
    assert.equal(stock, 0);
    //订单量等于库存量
    let ordersCount = await RedisClient.llenAsync(KEY_ORDERS);
    assert.equal(ordersCount, preDefined_stock);
    console.log(`${chalk.green('Success')}`);
  } catch (e) {
    console.log(`${chalk.red('Fail')}`);
    console.log(e)
  }
}


/**
 * Redis处理库存
 */
exports.RedisSeckillAssert = async (preDefined_stock, preDefined_productId) => {
  try {
    //被秒杀数等于库存数
    let { stock } = await RedisClient.hgetallAsync(KEY_PRODUCT_STOCK);
    assert.equal(stock, 0);
    //订单量等于库存量
    let ordersCount = await RedisClient.llenAsync(KEY_ORDERS);
    assert.equal(ordersCount, preDefined_stock);
    console.log(`${chalk.green('Success')}`);
  } catch (e) {
    console.log(`${chalk.red('Fail')}`);
    console.log(e)
  }
}
