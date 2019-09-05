const redis = require('redis');
const bluebird = require('bluebird');
const Config = require('../config')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


let client = redis.createClient({
  host: Config.redis.host,
  port: Config.redis.port
})

client.on("error", function (err) {
  console.log("Error " + err);
});


module.exports = client;
