const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Contract = require('../models/contract');


router.get('/listContracts', function(req, res) {
    Contract.findAll().then(contracts => {
        res.send(contracts);
    })
  });

router.post('/createContract', function(req, res){
    try{
        console.log(req.body);
        const contract = Contract.create(req.body);
        return res.send(req.body);
    }catch (err){
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/updateContract', function(req,res){
    Contract.findById(req.body.id).then(contract => {
        if(contract){
            contract.update(req.body).then(() => {
                res.send(contract);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

router.delete('/deleteContract', function(req,res){
    Contract.findById(req.body.id).then(contract => {
        if(contract){
            contract.destroy().then(() => {
                res.send(contract);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

module.exports = app => app.use('/contract', router);