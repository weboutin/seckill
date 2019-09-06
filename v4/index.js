const RedisClient = require('../common/getRedisInstance')
const { KEY_ORDERS, KEY_PRODUCT_STOCK } = require("../common/models/rediskey")
const fs = require('fs')
const path = require('path')

module.exports = async (uid, productId, stock) => {
  try {
    //减库存
    let isSeckillSuccess = await RedisClient.evalAsync(fs.readFileSync(path.join(__dirname, './seckill.lua')), 1, KEY_PRODUCT_STOCK);
    //生成订单
    if (isSeckillSuccess === 1) {
      await RedisClient.lpushAsync(KEY_ORDERS, `uid:${uid}|productId:${productId}`);
    }
  } catch (e) {
    console.log(e)
    return false
  }
}
