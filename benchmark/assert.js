const Product = require('../common/models/product');
const Order = require('../common/models/order');
const co = require('co');
const assert = require('assert')
const chalk = require('chalk');

async function main(preDefined_stock, preDefined_productId) {
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

co(async () => {
  await main(2, 1)
})



