var express = require('express');
var router  = express.Router();
var UniModel = require('./../models/uniModel');
var UserModel = require('./../models/userModel');
var uni = require('./../helpers/universityList');

module.exports = function(){
    router.get('/getUniByCountry', function(req, res, next){

        var uniOfCountry = uni.filter(function (el) {
            return el.country == req.user.country;
        });

        var listOfUniversities = uniOfCountry.map(function (obj) {
            return obj.name;
        });

        res.send(listOfUniversities);

    });

    router.get('/addAllUni', function(req, res, next){
        
        if(req.user.role == 1){
            var uniOfCountry = uni.filter(function (el) {
                return el.country;
            });
            
            for(let uni of uniOfCountry){
                let newUni = new UniModel();
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

    router.put('/chooseUni', function(req, res, next){
        req.assert('uni', 'University is required.').notEmpty();
        req.assert('year', 'Year is required.').notEmpty();
        UserModel.findByIdAndUpdate(req.user._id, {uni: req.body.uni, year: req.body.year}, {new: true, useFindAndModify: false}, function(err, user){
            if(err){
                return next(err);
            }
            res.json(user);
        });
    });

    router.get('/getCourses', function(req, res, next){
        UniModel.findOne({name: req.user.uni}, function(err, uni){
            if(err){
                return next(err);
            }
            res.json(uni.courses);
        });
    });

    router.put('/addCourse', function(req, res, next){
        req.assert('courseName', 'Coursename is required.').notEmpty();
        UniModel.findOneAndUpdate({name: req.user.uni}, {$addToSet: {courses: req.body.courseName}}, {useFindAndModify: false}, function(err, uni){
            if(err){
                return next(err);
            }
            res.json(uni);
        });
    });

    router.put('/addCoursesToProfile', function(req, res, next){
        req.assert('courses', 'Courses are required.').notEmpty();
        if(typeof req.body.courses === 'string'){
            UserModel.findByIdAndUpdate(req.user._id, {$addToSet: {courses: req.body.courses}}, {useFindAndModify: false}, function(err, user){
                if(err){
                    return next(err);
                }
                res.json(user);
            });
        }else{
            UserModel.findByIdAndUpdate(req.user._id, {$addToSet: {courses: {$each: req.body.courses}}}, {useFindAndModify: false}, function(err, user){
                if(err){
                    return next(err);
                }
                res.json(user);
            });
        }

    })

    return router;

}