const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
const middleware = require('../middleweres/auth');


router.get('', middleware.verify, function(req, res) {
    //console.log(req);
        User.findAll({
            where: req.query
        }).then(users => {
            res.send(users);
        });
  });

router.post('/auth', function(req, res) {
    User.findOne({where: {login: req.body.login}}).then((user) => {
    if (user) {
        bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) { 
            // password is correct
            const token = jwt.sign(user.get({plain: true}), config.secret);            
            res.json({message: 'User authenticated', user: user, token: token}); 
        } else { 
            // password is wrong
            res.json({message: 'Wrong password'});
        }               
    });         
    } else {            
    res.json({message: 'User not found'});        
}    
}); 
});
router.post('/', function(req, res){
    try{
        console.log(req.body);
        bcrypt.hash(req.body.password, 12).then((result) =>{
            User.create({
                name: req.body.name,
                login: req.body.login,
                password: result,
                email: req.body.email
            });
        });
        
        return res.send(req.body);
    }catch (err){
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/', middleware.verify, function(req,res){
    User.findByPk(req.params.id).then(user => {
        if(user){
            User.update(req.body).then(() => {
                res.send(user);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

router.delete('/', middleware.verify, function(req,res){
    User.findByPk(req.params.id).then(user => {
        if(user){
            User.destroy().then(() => {
                res.send(user);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

module.exports = app => app.use('/user', router);