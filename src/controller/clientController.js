const express = require('express');
const router = express.Router();
const Client = require('../models/client');

const url = '/client';

router.get('', function(req, res) {
    Client.findAll({
        where: req.query
    }).then(clients => {
        res.send(clients);
    });
});

router.get('/:id', function(req, res) {
    Client.findOne({
        where: req.params
    }).then(client => {
        if (client) {
            res.send(client);
        } else {
            res.json({error: 'client not found'});
        }
    });
});

router.post('', function(req, res) {
    try {
        Client.create(req.body);
        return res.send(req.body);
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
});

router.put('/:id', function(req,res) {
    Client.findByPk(req.params.id).then(client => {
        if (client) {
            Client.update(req.body).then(() => {
                res.send(client);
            });
        } else {
            res.json({error: 'client not found'});
        }
    });
});

router.delete('/:id', function(req,res) {
    Client.findByPk(req.params.id).then(client => {
        if(client) {
            Client.destroy({where: req.params}, {where: req.params}).then(() => {
                res.send(client);
            });
        } else {
            res.json({error: "client not found"});
        }
    });
});

module.exports = app => app.use(url, router);