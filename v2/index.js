const Order = require('../common/models/order');
const Product = require('../common/models/product');
const sequelize = require('../common/getInstance');

module.exports = async (uid, productId) => {
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
    await Order.create({
      uid: uid,
      productId: productId
    }, { transaction })
    await transaction.commit();
  } catch (err) {
    if (err) {
      await transaction.rollback();
    }
  }
}
