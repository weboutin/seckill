const co = require('co');
const v1 = require('../v1');
const v2 = require('../v2');
const init = require('../common/init');
const v = process.env.v || '';

co(async () => {
  await init();
  const productId = 1;
  // let uid = 1;
  for (let uid = 1; uid <= 20; uid++) {
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
