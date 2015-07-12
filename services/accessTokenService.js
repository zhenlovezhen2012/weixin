/**
 * Created by jianxun on 2015/7/10.
 */
var accessTokenDao = require('../dao/accessTokenDao');
var requestService = require('./requestService');
function tokenInit(callback) {
    requestService.getAccessToken(function (err, token) {
        if (err) {
            return callback(err, null);
        }
        //存储token
        accessTokenDao.findOneAndUpdate(token.access_token,token.expires_in,function(err,token0){
            if(err){
                return callback(err, null);
            }
            callback(null,token0);
        });
    });
}

function getToken(callback){
    //判断是否过期
    accessTokenDao.findToken(function(err,token){
        if(err){
            callback(err,null);
        }else if(!token){
            tokenInit(callback);
        }else{
            //如果离过期时间还有半小时就取新的token
            if(Date.now()/1000 - token.updateAt > (token.expires - 1800)){
                tokenInit(callback);
            }else{
                callback(null,token);
            }
        }
    });
}

module.exports= {
    tokenInit:tokenInit,
    getToken:getToken
};