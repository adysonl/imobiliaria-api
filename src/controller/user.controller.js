const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/index');
const config = require('../config');
const middleware = require('../middleweres/auth');


router.get('/user', function(req, res) {
    models.User.findAll({
        where: req.query,
        attributes: ['id', 'name', 'login', 'email']
    }).then(users => {
        res.send(users);
    });
  });

router.post('/login', function(req, res) {
    models.User.findOne({where: {login: req.body.login}}).then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password).then((result) => {
            if (result) { 
                // password is correct
                const token = jwt.sign(user.get({plain: true}), config.secret);            
                res.json({message: 'User authenticated', token: token}); 
                } else { 
                // password is wrong
                res.status(400).send({error: 'Credenciais inválidas'});
            }               
        });         
        } else {            
            res.status(404).send({error: 'Usuário não encontrado'});        
        }    
    }); 
});

router.post('/signup', function(req, res){ //TODO: adicionar verificação de token, assim só  um usuário pode cadastrar outro
    try{
        bcrypt.hash(req.body.password, 12).then((result) =>{
            models.User.create({
                name: req.body.name,
                login: req.body.login,
                password: result,
                email: req.body.email
            });
        });
        return res.send({message: 'user created'});
    }catch (err){
        return res.status(400).send({error: 'Falha no registro'});
    }
    
});

router.put('/', middleware.verify, function(req,res){
    models.User.findByPk(req.params.id).then(user => {
        if(user){
            User.update(req.body, {where: req.params}).then(() => {
                res.send({message: 'user updated'});
            })
        }else{
            res.status(404).send({error: 'Usuário não encontrado'});
        }
    });
});

router.delete('/', middleware.verify, function(req,res){
    models.User.findByPk(req.params.id).then(user => {
        if(user){
            User.destroy({where: req.params}).then(() => {
                res.send({message: 'user deleted'});
            })
        }else{
            res.status(404).send({error: "user not found"});
        }
    });
});

module.exports = app => app.use('/auth', router);