const co = require('co');
const v1 = require('../v1');
const v2 = require('../v2');
const v3 = require('../v3');
const v4 = require('../v4');
const init = require('../common/init');
const v = process.env.v || '';
const { MySQLOnlyAssert, RedisOrderAssert, RedisSeckillAssert } = require('./assert');

//库存数
const stock = 2;
//并发用户数
const cUser = 10;
//固定商品Id
const productId = 1;
//初始化请求计数器
let finishedRequest = 0;

co(async () => {
  await init(stock);
  for (let uid = 1; uid <= cUser; uid++) {
    excute(uid, productId)
  }
})

function checkIsFinish() {
  finishedRequest++;
  if (finishedRequest >= cUser) {
    checkResult();
  }
}

async function checkResult() {
  let version = v;
  let preDefined_stock = stock;
  let preDefined_productId = productId;
  switch (version) {
    case 'v1':
    case 'v2':
      MySQLOnlyAssert(preDefined_stock, preDefined_productId);
      break;
    case 'v3':
      RedisOrderAssert(preDefined_stock, preDefined_productId)
      break;
    case 'v4':
      RedisSeckillAssert(preDefined_stock, preDefined_productId)

  }
}

async function excute(uid, productId) {
  let version = v;
  try {
    switch (version) {
      case 'v1':
        await v1(uid, productId);
        break;
      case 'v2':
        await v2(uid, productId);
        break;
      case 'v3':
        await v3(uid, productId, stock);
        break;
      case 'v4':
        await v4(uid, productId, stock);
        break;
    }
    checkIsFinish();

  } catch (e) {
    console.log(e)
  }
}
