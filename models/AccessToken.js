/**
 * Created by jianxun on 2015/7/10.
 */
var mongodb = require('../services/dbService');
var mongoose = require('mongoose');
var Schema = mongodb.mongoose.Schema;

var AccessTokenSchema = new Schema({
    id:{
        type: String,
        require:true,
        default:"token"
    },
    value: {
        type: String,
        require:true
    },
    expires:{
        type: Number,
        require:true
    },
    updateAt: {
        type: Date
    }
});
AccessTokenSchema.pre('save', function (next) {
    this.updateAt = Date.now();
    next();
});

AccessTokenSchema.pre('update', function () {
    this.update({
        $set: {
            updatedAt: Date.now()
        }
    });
});

module.exports = mongoose.model("AccessToken", AccessTokenSchema);