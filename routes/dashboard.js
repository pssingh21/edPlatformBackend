var express = require('express');
var router = express.Router();

var PostsModel = require('./../models/postsModel');

module.exports = function(){
    
    router.get('/', function(req, res, next){
        PostsModel.find({}.sort({
            createdAt: -1
        })).exec(function(err, posts){
            if(err){
                return next(err);
            }
            res.json(posts);
        })
    });

}