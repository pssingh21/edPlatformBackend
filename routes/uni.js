var express = require('express');
var router  = express.Router();
// var uniModel = require('./../models/uniModel');
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

    return router;
}