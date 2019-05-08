const express = require('express');
const router = express.Router();
const models = require('../models/index');
const middleware = require('../middleweres/auth');
const pdf = require('html-pdf');
const fs = require('fs');

const replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}; 
const escapeRegExp = function(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

const include = 
[
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
];
const url = '/payment';

router.get('', middleware.verify, function(req, res) {
    models.Payment.findAll({
        include: include,
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

router.put('/:id/pay', middleware.verify, function(req,res) {
    models.Payment.findByPk(req.params.id).then(payment => {
        if (payment) {
            payment.status = 'paid';
            payment.paymentDate = new Date();
            console.log(payment)
            payment.update(payment.dataValues, {where: req.params}).then(() => {
                res.send({message: 'payment changed'});
            });
        } else {
            res.json({error: 'payment not found'});
        }
    });
});

router.get('/:id/print', middleware.verify, function(req, response) {
    models.Payment.findOne({
        include: include,
        where: req.params
    }).then(payment => {
        payment.paymentDate = new Date();

        var html = fs.readFileSync('src/assets/payment.html', 'utf-8');
        html = replaceAll(html, 'renter', payment.contract.renter.name);

        html = replaceAll(html, 'locator', payment.contract.property.locator.name);
        html = replaceAll(html, 'nationalId', payment.contract.property.locator.nationalId);

        if (payment.contract.property.address) {
            html = replaceAll(html, 'street', payment.contract.property.address.street);
            html = replaceAll(html, 'neighbour', payment.contract.property.address.neighbour);
            html = replaceAll(html, 'city', payment.contract.property.address.city);
            html = replaceAll(html, 'state', payment.contract.property.address.state);
            html = replaceAll(html, 'country', payment.contract.property.address.country);
        }

        html = replaceAll(html, 'day', payment.paymentDate.getDay());
        html = replaceAll(html, 'month', payment.paymentDate.getMonth());
        html = replaceAll(html, 'year', payment.paymentDate.getYear());

        html = replaceAll(html, 'value', payment.contract.value);
        html = replaceAll(html, 'condo', payment.contract.condo);


        pdf.create(html, {format: 'Letter' }).toFile('public/payment.pdf', function(err, res) {
            if (err) return console.log(err);
            var stream = fs.createReadStream('public/payment.pdf');
            response.setHeader('Content-type', 'application/pdf');
            stream.pipe(response);
            response.send('/static/payment.pdf');
        });

    })
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