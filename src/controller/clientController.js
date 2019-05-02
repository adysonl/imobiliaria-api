const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const Address = require('../models/address');
const middleware = require('../middleweres/auth');
const url = '/client';

router.get('', middleware.verify, function(req, res) {
    Client.findAll({
        where: req.query
    }).then(clients => {
        res.send(clients);
    });
});

router.get('/:id', middleware.verify, function(req, res) {
    Client.findOne({
        where: req.params
    }).then(client => {
        if (client) {
            Address.findOne({where: client.Address}).then(address=>{
                client.address = address;
                res.send(client);
            });
            
        } else {
            res.json({error: 'client not found'});
        }
    });
});

router.post('', middleware.verify, function(req, res) {
    try {
        Client.create(req.body);
        return res.send({message: 'client created'});
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
});

router.put('/:id', middleware.verify, function(req,res) {
    Client.findByPk(req.params.id).then(client => {
        if (client) {
            Client.update(req.body, {where: req.params}).then(() => {
                res.send({message: 'client updated'});
            });
        } else {
            res.json({error: 'client not found'});
        }
    });
});

router.delete('/:id', middleware.verify, function(req,res) {
    Client.findByPk(req.params.id).then(client => {
        if(client) {
            Client.destroy({where: req.params}).then(() => {
                res.send({message: 'client deleted'});
            });
        } else {
            res.json({error: "client not found"});
        }
    });
});
router.get('', function(req, res) {
    Client.findAll().then(clientes => {
        res.send(clientes);
    })
  });
module.exports = app => app.use(url, router);