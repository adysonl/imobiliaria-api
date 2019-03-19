const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Immobile = require('../models/immobile');
const middleware = require('../middleweres/auth');

router.get('/', function(req, res) {
    Immobile.findAll({
        where: req.query
    }).then(immobiles => {
        res.send(immobiles);
    })
  });

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
        const Immobile = Immobile.create(req.body);
        return res.send({message: 'immobile created'});
    }catch (err){
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', middleware.verify, function(req,res){
    Immobile.findByPk(req.params.id).then(immobile => {
        if(immobile){
            immobile.update(req.body, {where: req.params}).then(() => {
                res.send(immobile);
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
                res.send(immobile);
            })
        }else{
            res.json({error: "immobile not found"});
        }
    });
});

module.exports = app => app.use('/immobile', router);