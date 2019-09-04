const Order = require('../common/models/order');
const Product = require('../common/models/product');
const sequelize = require('../common/getInstance');

module.exports = async (uid, productId) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    let productInfo = await Product.findOne({ productId: productId, transaction })
    if (productInfo.toJSON().stock <= 0) {
      throw new Error('stock not enough')
    }
    await Product.decrement('stock', {
      where: {
        id: productId
      },
      transaction
    })
    await Order.create({
      uid: uid,
      productId: productId
    }, { transaction })
    await transaction.commit();
  } catch (err) {
    if (err) {
      console.log(err)
      await transaction.rollback();
    }
  }
}
