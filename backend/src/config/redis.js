const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-12094.c8.us-east-1-3.ec2.cloud.redislabs.com',
        port: 12094
    }
});

module.exports = redisClient;
