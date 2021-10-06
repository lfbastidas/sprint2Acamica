const redis = require('redis');
const clienteRedis = redis.createClient(6379);

module.exports = clienteRedis;