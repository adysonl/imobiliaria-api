const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const middleware = require('../middleweres/auth');

const url = '/payment';

router.get('', middleware.verify, function(req, res) {
    Payment.findAll({
        where: req.query
    }).then(payments => {
        res.send(payments);
    })
  });

router.get('/:id', middleware.verify, function(req, res) {
    Payment.findOne({
        where: req.params
    }).then(payment => {
        if (payment) {
            res.send(payment);
        } else {
            res.json({error: 'payment not found'});
        }
    });
});

router.post('', middleware.verify, function(req, res) {
    try {
        const Payment = Payment.create(req.body);
        return res.send({message: 'payment created'});
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', middleware.verify, function(req,res) {
    Payment.findByPk(req.params.id).then(payment => {
        if (payment) {
            payment.update(req.body, {where: req.params}).then(() => {
                res.send({message: 'payment changed'});
            });
        } else {
            res.json({error: 'payment not found'});
        }
    });
});

router.delete('/:id', middleware.verify, function(req,res) {
    Payment.findByPk(req.params.id).then(payment => {
        if (payment) {
            payment.destroy({where: req.params}).then(() => {
                res.send(payment);
            });
        } else {
            res.json({error: 'payment not found'});
        }
    });
});

module.exports = app => app.use('/payment', router);