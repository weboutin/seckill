const Product = require('../common/models/product');
const RedisClient = require('../common/getRedisInstance')
const sequelize = require('../common/getInstance');
const { KEY_ORDERS } = require("../common/models/rediskey")

module.exports = async (uid, productId, stock) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Product.decrement('stock', {
      where: {
        id: productId
      },
      transaction
    })
    let productInfo = await Product.findOne({ productId: productId, transaction })
    if (productInfo.toJSON().stock < 0) {
      throw new Error('stock not enough')
    }
    await transaction.commit();
  } catch (err) {
    if (err) {
      await transaction.rollback();
      return false;
    }
  }
  await RedisClient.lpushAsync(KEY_ORDERS, `uid:${uid}|productId:${productId}`);
  return true;
}
