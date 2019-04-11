const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const middleware = require('../middleweres/auth');
const url = '/client';


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
router.get('/', function(req, res){
    const page_size = req.query.page_size;
    const page_number = req.query.page_number;
    console.log(page_number);
    Client.findAll({ limit: page_size, offset: (page_number-1)*page_size }).then(client => {
        res.send(client);
    });
});
module.exports = app => app.use(url, router);