const co = require('co');
const v1 = require('../v1');
const v2 = require('../v2');
const init = require('../common/init');
const v = process.env.v || '';

//库存数
const stock = 2;
//并发用户数
const cUser = 10;
//固定商品Id
const productId = 1;

co(async () => {
  await init(stock);
  for (let uid = 1; uid <= cUser; uid++) {
    excute(v, uid, productId)
  }
})


async function excute(version, uid, productId) {
  switch (version) {
    case 'v1':
      await v1(uid, productId);
      break;
    case 'v2':
      await v2(uid, productId);
      break;
    default:
      throw new Error('unknow version')
  }
}
