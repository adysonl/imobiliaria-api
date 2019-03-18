const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Immobile = require('../models/immobile');

const url = '/immobile';

router.get(url, function(req, res) {
    Immobile.findAll().then(immobiles => {
        res.send(immobiles);
    })
  });

router.get(url + '/:id', function(req, res) {
    Immobile.findById(req.params.id).then(immobile => {
        if(immobile) {
            res.send(immobile);
        } else {
            res.json({error: 'immobile not found'});
        }
    });
});

router.post(url, function(req, res){
    try{
        const immobile = Immobile.create(req.body);
        return res.send(req.body);
    }catch (err){
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put(url + '/:id', function(req,res){
    Immobile.findById(req.params.id).then(immobile => {
        if(immobile){
            immobile.update(req.body).then(() => {
                res.send(immobile);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

router.delete(url + '/:id', function(req,res){
    Immobile.findById(req.params.id).then(immobile => {
        if(immobile){
            immobile.destroy().then(() => {
                res.send(immobile);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

module.exports = app => app.use(url, router);