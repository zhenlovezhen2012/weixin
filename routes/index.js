var express = require('express');
var index = express.Router();
var utils =  require('../utils/sourceVerify');
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder({rootName:"xml"});
var global = require('../global');

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
index.post('/',function(req,res){
    console.log('req.query: ',req.query);
    console.log('req.body: ',req.body);
    //解析xml
    parseString(req.body, {
        explicitArray: false,
        explicitRoot:false
    }, function (err, result) {
        console.log("收到消息: ",result);
        //返回xml
        var reMsg = {
            ToUserName: result.ToUserName,
            FromUserName: 'gh_cd563fc0c468',
            CreateTime: parseInt(Date.now()/1000),
            MsgType: 'text',
            Content: '您发送的信息是:'+result.Content
        };
        var xml = builder.buildObject(reMsg);
        console.log('返回的xml: ',xml);
        res.send(xml).end();
    });
});
module.exports = index;
