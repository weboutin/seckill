const Order = require('../model/order');
const Product = require('../model/product');
const sequelize = require('../model/getInstance');

module.exports = async (uid, productId) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Product.decrement('stock', {
      where: {
        id: productId
      }
    })
    await transaction.commit();
  } catch (err) {
    if (err) {
      console.log(err)
      await transaction.rollback();
    }
  }
}
