/**
 * Created by jianxun on 2015/7/1.
 * @Service dbService
 */


var mongoose = require('mongoose');
var global = require('../global');
var logger = require('./logService').getLogger('DBService');

mongoose.connection.on('connected', function () {
    logger.info('Mongoose connected to ' + global.mongoDbUrl);
});

mongoose.connection.on('error', function (err) {
    logger.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.info('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

mongoose.connect(global.mongoDbUrl);

exports.mongoose = mongoose;