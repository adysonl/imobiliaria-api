const express = require('express');
const router = express.Router();
const Client = require('../models/client');
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
            res.send(client);
        } else {
            res.json({error: 'client not found'});
        }
    });
});

router.post('', middleware.verify, function(req, res) {
    try {
        Client.create(req.body);
        return res.send(req.body);
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
});

router.put('/:id', middleware.verify, function(req,res) {
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

router.delete('/:id', middleware.verify, function(req,res) {
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