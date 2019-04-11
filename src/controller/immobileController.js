const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Immobile = require('../models/immobile');
const Client = require('../models/client');
const middleware = require('../middleweres/auth');

router.get('/:id', function(req, res) {
    Immobile.findOne({
        where: req.params
    }).then(immobile => {
        if(immobile) {
            res.send(immobile);
        } else {
            res.send(req);
            res.json({error: 'immobile not found'});
        }
    });
});

router.post('', middleware.verify, function(req, res){
    try{
        Immobile.create(req.body);
        return res.send({message: 'immobile created'});
    }catch (err){
        console.log("||||||||||||");
        console.log(err);
        console.log("||||||||||||");
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', middleware.verify, function(req,res){
    Immobile.findByPk(req.params.id).then(immobile => {
        if(immobile){
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

router.get('/', function(req, res){
    const page_size = req.query.page_size;
    const page_number = req.query.page_number;
    Immobile.findAll({ limit: page_size, offset: (page_number-1)*page_size }).then(immobile => {
        for(let i=0; i<immobile.length; i++){
            let index = i;
            //console.log(immobile[index].dataValues.locator);
            let id = immobile[index].dataValues.locator;
            Client.findByPk(id).then(locator =>{
                immobile[index].dataValues.locator = locator.dataValues;
                if(index == page_size-1){
                    res.send(immobile);
                }
            });
        }
        //res.send(immobile);
    });
});

module.exports = app => app.use('/immobile', router);