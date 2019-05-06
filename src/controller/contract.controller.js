const express = require('express');
const router = express.Router();
const models = require('../models/index');
const middleware = require('../middleweres/auth');
// const jsPDF = require('jspdf');
const url = '/contract';
const include = [
    {
        model: models.Property,
        as: 'property',
        include: [
            {
                model: models.Client,
                as: 'locator'
            }
        ]
    },
    {
        model: models.Client,
        as: 'renter'
    }
];
router.get('', middleware.verify, function(req, res) {
    models.Contract.findAll({
        include: include,
        where: req.query
    }).then(contracts => {
        res.send(contracts);
    })
  });

router.get('/:id', middleware.verify, function(req, res) {
    models.Contract.findOne({
        include: include,
        where: req.params
    }).then(contract => {
        if (contract) {
            res.send(contract);
        } else {
            res.json({error: 'contract not found'});
        }
    });
});

router.get('/:id/print', middleware.verify, function(req, res) {
    models.Contract.findOne({
        include: include,
        where: req.params
    }).then(contract => {
        // if (contract) {
        //     var doc = new jsPDF();
        //     doc.text('Hello world!', 10, 10);
        //     doc.save('a4.pdf');
        // }
    })
});

router.post('', middleware.verify, function(req, res) {
    try {
        models.Contract.create(req.body).then(response => {
            const contract = response;
            let paymentDate = contract.startDate;
            let payments = [];
            while (paymentDate < contract.endDate) {
                payments.push(
                    {
                        contractId: contract.id,
                        dueDate: new Date(paymentDate),
                        status: 'future'
                    }
                )
                paymentDate.setMonth(paymentDate.getMonth() + 1);  
            }

            models.Payment.bulkCreate(payments);
        });
        return res.send({message: 'contract created'});
    } catch (err) {
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', middleware.verify, function(req,res) {
    models.Contract.findByPk(req.params.id).then(contract => {
        if (contract) {
            contract.update(req.body, {where: req.params}).then(() => {
                res.send({message: 'contract updated'});
            });
        } else {
            res.json({error: 'contract not found'});
        }
    });
});

router.delete('/:id', middleware.verify, function(req,res) {
    models.Contract.findByPk(req.params.id).then(contract => {
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