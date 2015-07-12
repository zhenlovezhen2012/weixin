/**
 * Created by jianxun on 2015/7/10.
 */
var xml2js = require('xml2js');
var builder = new xml2js.Builder({rootName: "xml"});
var global = require('../global');

function textResp(messageObj, res) {
    var reMsg = {
        ToUserName: messageObj.FromUserName,
        FromUserName: global.weixinAccount,
        CreateTime: parseInt(Date.now() / 1000),
        MsgType: 'text',
        Content: '您发送的信息是:' + messageObj.Content
    };
    var xml = builder.buildObject(reMsg);
    console.log('返回的xml: ', xml);
    res.send(xml).end();
}

function eventResp(messageObj, res) {
    switch (messageObj.Event){
        case "subscribe":
            var reMsg = {
                ToUserName: messageObj.FromUserName,
                FromUserName: global.weixinAccount,
                CreateTime: parseInt(Date.now() / 1000),
                MsgType: "text",
                Content: "感谢您关注.."
            };
            var xml = builder.buildObject(reMsg);
            console.log('返回的xml: ', xml);
            res.send(xml).end();
            break;
        case "CLICK":
            var EventKey = messageObj.EventKey;
            var reMsg = {
                ToUserName: messageObj.FromUserName,
                FromUserName: global.weixinAccount,
                CreateTime: parseInt(Date.now() / 1000),
                MsgType: "text",
                Content: "开发者:李建勋,\n性别:男"
            };
            var xml = builder.buildObject(reMsg);
            console.log('返回的xml: ', xml);
            res.send(xml).end();
            break;
        default :
            var reMsg = {
                ToUserName: messageObj.FromUserName,
                FromUserName: global.weixinAccount,
                CreateTime: parseInt(Date.now() / 1000),
                MsgType: "text",
                Content: "不支持事件类型: "+messageObj.Event
            };
            var xml = builder.buildObject(reMsg);
            console.log('返回的xml: ', xml);
            res.send(xml).end();
            break;
    }
}
module.exports = {
    textResp: textResp,
    eventResp:eventResp
};