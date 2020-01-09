var express = require('express');
var router  = express.Router();
var uniModel = require('./../models/uniModel');
var uni = require('./../helpers/universityList');

module.exports = function(){
    router.get('/getUniByCountry/:abbr', function(req, res, next){

        var uniOfCountry = uni.filter(function (el) {
            return el.country == req.params.abbr;
        });

        var listOfUniversities = uniOfCountry.map(function (obj) {
            return obj.name;
        });

        res.send(listOfUniversities);

    });

    router.get('/addAllUni', function(req, res, next){
        console.log('req.user');
        if(req.user.role == 1){
            var uniOfCountry = uni.filter(function (el) {
                return el.country;
            });
            
            for(let uni of uniOfCountry){
                let newUni = new uniModel();
                newUni.name = uni.name;
                newUni.country = uni.country;
                newUni.save(function(err, save){
                    if(err){
                        return next(err);
                    }
                });
            }
            res.send({"done": true});
        }else{
            return next({
                status: 403,
                messsage: "Access denied"
            });
        }
        
        
    });

    return router;

}