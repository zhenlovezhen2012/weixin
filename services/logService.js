module.exports = {
    getLogger: getLogger
};


var log4js = require('log4js');
var global = require('../global');
var DEFAULT_LEVEL = process.env.LOGLEVEL || 'DEBUG';

log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'file', filename: global.baseDir + '/logs/log.log', "maxLogSize": 20480, "backups": 3}]
});

function getLogger(category, level) {
    var logger = log4js.getLogger(category);
    if (level)
        logger.setLevel(level);
    else
        logger.setLevel(DEFAULT_LEVEL);

    return logger;
}
