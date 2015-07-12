var express = require('express');
var api = express.Router();
var async = require('async');
var accessTokenService = require('../services/accessTokenService');
var requestService = require('../services/requestService');
var logger = require('../services/logService').getLogger('API');
/* GET users listing. */
api.get('/createMenu', function (req, res, next) {
    var type = req.query.type;
    var menuName = req.query.menuName;
    if (!type || !menuName) {
        res.status(400).end();
    } else {
        /*
         {
         "button":[
         {
         "type":"click",
         "name":"今日歌曲",
         "key":"V1001_TODAY_MUSIC"
         }]
         }
         */
        var menu = {
            "button": [
                {
                    "type": type,
                    "name": menuName,
                    "key": "developer"
                }]
        };
        //线获得token再去创建
        async.waterfall([
            function (callback) {
                accessTokenService.getToken(callback);
            },
            function (token, callback) {
                requestService.createMenu(menu,token.value,callback);
            }
        ], function (err, result) {
            if(err){
                return res.status(500).end();
            }
            logger.info("创建菜单成功,",result,menu);
            res.json({ok:"ok"}).end();
        });
    }
});


module.exports = api;
