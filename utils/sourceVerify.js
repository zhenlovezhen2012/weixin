/**
 * Created by jianxun on 2015/7/7.
 */
var global = require('../global');
var crypto = require('crypto');

function sha1(str) {
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str, 'utf8');
    str = md5sum.digest('hex');
    return str;
}

function sourceVerify(signature, timestamp, nonce, echostr) {
    var token = global.token;
    //按字典排序
    var arr = [];
    arr.push(timestamp);
    arr.push(nonce);
    arr.push(token);
    arr = arr.sort();
    var str = "";
    arr.forEach(function (i) {
        str = str + i;
    });
    console.log('排序后: ',str);
    //sha1加密
    str = sha1(str);
    console.log("加密后str: ",str);
    if (str == signature) {
        return true;
    }
    return false;
}

module.exports = {
    sourceVerify: sourceVerify
};