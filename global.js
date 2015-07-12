/**
 * Created by jianxun on 2015/7/7.
 */

var token = "jianxun";

module.exports = {
    token: token,
    weixinAccount: process.env.WEIXINACCOUNT,
    mongoDbUrl: process.env.mongoDbUrl || "mongodb://localhost:27017/weixin",
    appId: process.env.APPID,
    appSecret: process.env.APPSECRET,
    baseDir:__dirname
};