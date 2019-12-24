var express = require('express');
var router  = express.Router();
var passwordHash = require('password-hash');
var mapUser = require('./../helpers/mapUser');
var jwt = require('jsonwebtoken');

var UserModel = require('./../models/userModel');

function createToken(user, config){
    var token = jwt.sign({
        id: user._id,
        username: user.username
    }, config.jwtSecret, {expiresIn: '6h'});
    return token;
}

module.exports = function(config){
    
    router.post('/register', function(req, res, next){
        req.assert('username', 'Username is required').notEmpty();
        req.assert('password', 'Password is required').notEmpty();
        req.assert('email','Email is required').notEmpty();

        var errors = req.validationErrors();
        var newUser = new UserModel();
        var mappedUser = mapUser(newUser, req.body);

        mappedUser.password = passwordHash.generate(req.body.password);
        mappedUser.save(function(err, user){
            if(err){
                return next(err);
            }
            console.log('here2');
            res.json(user);
        });
    });

    return router;
}