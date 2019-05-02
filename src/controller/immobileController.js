const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Immobile = require('../models/immobile');
const Client = require('../models/client');
const Address = require('../models/address');
const middleware = require('../middleweres/auth');

router.get('/:id', function(req, res) {
    Immobile.findOne({
        where: req.params
    }).then(immobile => {
        if(immobile) {
            Address.findOne({ where: immobile.address}).then( address =>{
                immobile.address = address;
                res.send(immobile);
            });
            
        } else {
            res.send(req);
            res.json({error: 'immobile not found'});
        }
    });
});

router.post('', middleware.verify, function(req, res){
    try{
        Address.create(req.body.address).then(address =>{
            req.body.Address = address;
            Immobile.create(req.body);
        });
        
        return res.send({message: 'immobile created'});
    }catch (err){
        console.log("||||||||||||");
        console.log(err);
        console.log("||||||||||||");
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', function(req,res){
    Immobile.findByPk(req.params.id).then(immobile => {
        if(immobile){            
            Address.update(req.body.address, {where: req.body.address});
            req.body.address = immobile.address;
            immobile.update(req.body, {where: req.params}).then(() => {
                res.send({message: 'immobile changed'});
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

router.delete('/:id', middleware.verify, function(req,res){
    Immobile.findByPk(req.params.id).then(immobile => {
        if(immobile){
            immobile.destroy({where: req.params}).then(() => {
                res.send({message: 'immobile removed'});
            })
        }else{
            res.json({error: "immobile not found"});
        }
    });
});

router.get('', function(req, res) {
    Immobile.findAll().then(immobiles => {
        res.send(immobiles);
    })
  });

module.exports = app => app.use('/immobile', router);