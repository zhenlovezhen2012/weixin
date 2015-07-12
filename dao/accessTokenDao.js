/**
 * Created by jianxun on 2015/7/10.
 */
var AccessToken = require('../models/AccessToken');

function findOneAndUpdate(value, expires, callback) {
    AccessToken.findOneAndUpdate({id: "token"},
        {id: "token", value: value, expires: expires},
        {new: true, upsert: true}, function (err, token) {
            if (err) {
                return callback(err, null);
            }
            callback(null, token);
        });
}

function findToken(callback) {
    AccessToken.findOne({id: "token"}, function (err, token) {
        callback(err, token);
    });
}
module.exports = {
    findOneAndUpdate: findOneAndUpdate,
    findToken: findToken
};