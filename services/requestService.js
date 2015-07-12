/**
 * Created by jianxun on 2015/7/10.
 */
var request = require('superagent');
var logger = require('../services/logService').getLogger('RequestService');
var global = require('../global');
exports.getAccessToken = function(callback){
    request
        .get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+global.appId+"&secret="+global.appSecret)
        .end(function(err, res){
            if(err){
                logger.error('getAccessToken请求失败',err);
                callback(err,null);
            }
            if(!res.body.errcode){
                logger.info('getAccessToken请求成功...');
                callback(null,res.body);
            }else{
                logger.error('getAccessToken请求失败',res.body);
                callback(res.body,null);
            }
        });
};

exports.createMenu = function(body,token,callback){
    // https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
    request
        .post("https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+token)
        .send(body)
        .end(function(err, res){
            if(err){
                logger.error('createMenu请求失败',err);
                callback(err,null);
            }
            if(res.body.errcode == 0){
                logger.info('createMenu请求成功...');
                callback(null,res.body);
            }else{
                logger.error('createMenu请求失败',res.body);
                callback(res.body,null);
            }
        });
};