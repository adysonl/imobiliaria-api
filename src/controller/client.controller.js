const express = require('express');
const router = express.Router();
const models = require( '../models/index');
const middleware = require('../middleweres/auth');
const url = '/client';

router.get('', middleware.verify, function(req, res) {
    models.Client.findAll({
        include: [{
            model: models.Address,
            as: 'address'
        }],
        where: req.query
    }).then(clients => {
        res.send(clients);
    });
});

router.get('/:id', middleware.verify, function(req, res) {
    models.Client.findOne({
        include: [{
            model: models.Address,
            as: 'address'
        }],
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
        models.Client.create(req.body);
        return res.send({message: 'client created'});
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
});

router.put('/:id', middleware.verify, function(req,res) {
    models.Client.findByPk(req.params.id).then(client => {
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
    models.Client.findByPk(req.params.id).then(client => {
        if(client) {
            Client.destroy({where: req.params}).then(() => {
                res.send({message: 'client deleted'});
            });
        } else {
            res.json({error: "client not found"});
        }
    });
});

module.exports = app => app.use(url, router);