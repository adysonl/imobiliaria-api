const express = require('express');
const router = express.Router();
const Contract = require('../models/contract');


const url = '/contract';

router.get(url, function(req, res) {
    Contract.findAll().then(contracts => {
        res.send(contracts);
    })
  });

router.get(url + '/:contract_id', function(req, res) {
    Contract.findById(req.params.contract_id).then(contract => {
        if (contract) {
            res.send(contract);
        } else {
            res.json({error: 'contract not found'});
        }
    });
});

router.post(url, function(req, res) {
    try {
        console.log(req.body);
        const contract = Contract.create(req.body);
        return res.send(req.body);
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put(url + '/:contract_id', function(req,res) {
    Contract.findById(req.params.contract_id).then(contract => {
        if (contract) {
            contract.update(req.body).then(() => {
                res.send(contract);
            });
        } else {
            res.json({error: 'user not found'});
        }
    });
});

router.delete(url + '/contract/:contract_id', function(req,res) {
    Contract.findById(req.params.contract_id).then(contract => {
        if (contract) {
            contract.destroy().then(() => {
                res.send(contract);
            });
        } else {
            res.json({error: 'contract not found'});
        }
    });
});

module.exports = app => app.use(url, router);