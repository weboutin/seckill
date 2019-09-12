const Product = require('../common/models/product');
const RedisClient = require('../common/getRedisInstance')
const sequelize = require('../common/getInstance');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { KEY_ORDERS } = require("../common/models/rediskey")

module.exports = async (uid, productId, stock) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    let rs = await Product.decrement('stock', {
      where: {
        id: productId,
        stock: {
          [Op.gt]: 0
        }
      },
      transaction
    })
    if (rs[0][1] == 0) {
      throw new Error('stock not enough')
    }
    await transaction.commit();
    await RedisClient.lpushAsync(KEY_ORDERS, `uid:${uid}|productId:${productId}`);
  } catch (err) {
    if (err) {
      console.log(err)
      await transaction.rollback();
      return false;
    }
  }
  return true;
}
