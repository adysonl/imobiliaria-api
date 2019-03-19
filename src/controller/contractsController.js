const express = require('express');
const router = express.Router();
const Contract = require('../models/contract');


const url = '/contract';

router.get('', function(req, res) {
    Contract.findAll({
        where: req.query
    }).then(contracts => {
        res.send(contracts);
    })
  });

router.get('/:id', function(req, res) {
    Contract.findOne({
        where: req.params
    }).then(contract => {
        if (contract) {
            res.send(contract);
        } else {
            res.json({error: 'contract not found'});
        }
    });
});

router.post('', function(req, res) {
    try {
        const contract = Contract.create(req.body);
        return res.send(req.body);
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', function(req,res) {
    Contract.findByPk(req.params.id).then(contract => {
        if (contract) {
            contract.update(req.body).then(() => {
                res.send(contract);
            });
        } else {
            res.json({error: 'user not found'});
        }
    });
});

router.delete('/:id', function(req,res) {
    Contract.findByPk(req.params.id).then(contract => {
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