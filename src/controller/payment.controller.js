const express = require('express');
const router = express.Router();
const models = require('../models/index');
const middleware = require('../middleweres/auth');

const url = '/payment';

router.get('', middleware.verify, function(req, res) {
    models.Payment.findAll({
        include: [
            {
                model: models.Contract,
                as: 'contract',
                include: [
                    {
                        model: models.Client,
                        as: 'renter',                            
                    },
                    {
                        model: models.Property,
                        as: 'property',
                        include: [
                            {
                                model: models.Client,
                                as: 'locator'
                            }
                        ]
                    }
                ]
            }
        ],
        where: req.query
    }).then(payments => {
        res.send(payments);
    })
  });

router.get('/:id', middleware.verify, function(req, res) {
    models.Payment.findOne({
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
        models.Payment.create(req.body);
        return res.send({message: 'payment created'});
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', middleware.verify, function(req,res) {
    models.Payment.findByPk(req.params.id).then(payment => {
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
    models.Payment.findByPk(req.params.id).then(payment => {
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