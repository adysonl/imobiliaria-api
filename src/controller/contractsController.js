const express = require('express');
const router = express.Router();
const Contract = require('../models/contract');
const middleware = require('../middleweres/auth');

const url = '/contract';

router.get('', middleware.verify, function(req, res) {
    Contract.findAll({
        where: req.query
    }).then(contracts => {
        res.send(contracts);
    })
  });

router.get('/:id', middleware.verify, function(req, res) {
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

router.post('', middleware.verify, function(req, res) {
    try {
        const Contract = Contract.create(req.body);
        return res.send({message: 'contract created'});
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', middleware.verify, function(req,res) {
    Contract.findByPk(req.params.id).then(contract => {
        if (contract) {
            contract.update(req.body, {where: req.params}).then(() => {
                res.send(contract);
            });
        } else {
            res.json({error: 'user not found'});
        }
    });
});

router.delete('/:id', middleware.verify, function(req,res) {
    Contract.findByPk(req.params.id).then(contract => {
        if (contract) {
            contract.destroy({where: req.params}).then(() => {
                res.send(contract);
            });
        } else {
            res.json({error: 'contract not found'});
        }
    });
});

module.exports = app => app.use(url, router);