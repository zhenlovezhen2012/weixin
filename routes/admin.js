var express = require('express');
var admin = express.Router();


admin.all('/',function(req,res,next){
    if(req.user || req.path == '/'){
        next();
    }else{
        return res.redirect('/admin');
    }
});
/* GET users listing. */
admin.get('/', function(req, res, next) {
    res.render('signin');
});

admin.post('/', function(req, res, next) {
    console.log("req.body : ",req.body);
    if(req.body.email == "viathink@admin.com" && req.body.password == "123"){
        req.user = {displayName:"admin"};
        res.locals.user = req.user;
        res.render('index');
    }else{
        res.redirect('/admin');
    }
});

module.exports = admin;
