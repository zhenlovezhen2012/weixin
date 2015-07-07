var express = require('express');
var index = express.Router();
var utils =  require('../utils/sourceVerify');
/* GET home page. */
index.get('/', function(req, res, next) {
    //signature、timestamp、nonce、echostr
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    console.log("参数: ",signature,timestamp,nonce,echostr);
    var b = utils.sourceVerify(signature,timestamp,nonce,echostr);
    if(b){
        console.log('验证成功...');
        res.send(echostr).end();
    }else{
        res.end();
    }
});

module.exports = index;
