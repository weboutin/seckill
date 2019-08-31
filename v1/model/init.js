const Product = require('../model/product');
const Order = require('../model/order');



const init = () => {
  Order.sync({ force: true })

  Product.sync({ force: true }).then(() => {
    Product.create({
      title: '代购买商品',
      stock: 2
    })
  })
}

init()
