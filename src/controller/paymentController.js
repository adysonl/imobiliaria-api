const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

router.get('', function(req, res) {
    Payment.findAll().then(payments => {
        res.send(payments);
    })
  });

router.get('' + '/:id', function(req, res) {
    Payment.findById(req.params.id).then(payment => {
        if (payment) {
            res.send(payment);
        } else {
            res.json({error: 'payment not found'});
        }
    });
});

router.post('', function(req, res) {
    try {
        console.log(req.body);
        const Payment = Payment.create(req.body);
        return res.send(req.body);
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('' + '/:id', function(req,res) {
    Payment.findById(req.params.id).then(payment => {
        if (payment) {
            payment.update(req.body).then(() => {
                res.send(payment);
            });
        } else {
            res.json({error: 'payment not found'});
        }
    });
});

router.delete('' + '/:id', function(req,res) {
    Payment.findById(req.params.id).then(payment => {
        if (payment) {
            payment.destroy().then(() => {
                res.send(payment);
            });
        } else {
            res.json({error: 'payment not found'});
        }
    });
});

module.exports = app => app.use(url, router);