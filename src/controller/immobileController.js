const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Immobile = require('../models/immobile');


router.get('/Immobiles', function(req, res) {
    Immobile.findAll().then(immobiles => {
        res.send(immobiles);
    })
  });

router.post('/Immobile', function(req, res){
    try{
        console.log(req.body);
        const immobile = Immobile.create(req.body);
        return res.send(req.body);
    }catch (err){
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/Immobile', function(req,res){
    Immobile.findById(req.body.id).then(immobile => {
        if(immobile){
            immobile.update(req.body).then(() => {
                res.send(immobile);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

router.delete('/Immobile', function(req,res){
    Immobile.findById(req.body.id).then(immobile => {
        if(immobile){
            immobile.destroy().then(() => {
                res.send(immobile);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

module.exports = app => app.use('/immobile', router);