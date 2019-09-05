const Product = require('../common/models/product');
const Order = require('../common/models/order');
const assert = require('assert')
const chalk = require('chalk');
const RedisClient = require('../common/getRedisInstance')
const { KEY_ORDERS } = require('../common/models/rediskey')

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
exports.RedisOrder = async (preDefined_stock, preDefined_productId) => {
  try {
    const { stock } = (await Product.findOne({ productId: preDefined_productId })).toJSON()
    //商品库存为0
    assert.equal(stock, 0);
    // const ordersCount = await Order.count();
    //订单量等于库存量
    let ordersCount = await RedisClient.llenAsync(KEY_ORDERS);
    console.log(ordersCount)
    assert.equal(ordersCount, preDefined_stock);
    console.log(`${chalk.green('Success')}`);
  } catch (e) {
    console.log(`${chalk.red('Fail')}`);
    console.log(e)
  }
}
