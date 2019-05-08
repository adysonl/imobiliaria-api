const express = require('express');
const router = express.Router();
const models = require('../models/index');
const middleware = require('../middleweres/auth');
const pdf = require('html-pdf');
const fs = require('fs');
const MONTHS = {
    '1': 'janeiro',
    '2': 'fevereiro',
    '3': 'março',
    '4': 'abril',
    '5': 'maio',
    '6': 'junho',
    '7': 'julho',
    '8': 'agosto',
    '9': 'setembro',
    '10': 'outubro',
    '11': 'novembro',
    '12': 'dezembro'
};

const replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}; 
const escapeRegExp = function(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

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

router.get('/:id/print', middleware.verify, function(req, response) {
    models.Contract.findOne({
        include: include,
        where: req.params
    }).then(contract => {
        var html = fs.readFileSync('src/assets/contract.html', 'utf-8');
        html = replaceAll(html, 'locator.name', contract.property.locator.name);
        html = replaceAll(html, 'locator.cpf', contract.property.locator.nationalId);
        html = replaceAll(html, 'locator.career', contract.property.locator.career);
        html = replaceAll(html, 'locator.rg', contract.property.locator.rg);

        html = replaceAll(html, 'renter.name', contract.renter.name);
        html = replaceAll(html, 'renter.cpf', contract.renter.nationalId);
        html = replaceAll(html, 'renter.career', contract.renter.career);
        html = replaceAll(html, 'renter.rg', contract.renter.rg);

        if (contract.property.address) {
            html = replaceAll(html, 'property.street', contract.property.address.street);
            html = replaceAll(html, 'property.neighbour', contract.property.address.neighbour);
            html = replaceAll(html, 'property.city', contract.property.address.city);
            html = replaceAll(html, 'property.state', contract.property.address.state);
            html = replaceAll(html, 'property.country', contract.property.address.country);
        }

        html = replaceAll(html, 'startDay', contract.startDate.getDay());
        html = replaceAll(html, 'startMonth', MONTHS[contract.startDate.getMonth()]);
        html = replaceAll(html, 'startYear', contract.startDate.getYear());

        html = replaceAll(html, 'value', contract.value);
        html = replaceAll(html, 'condo', contract.condo);


        pdf.create(html, {format: 'Letter' }).toFile('public/contract.pdf', function(err, res) {
            if (err) return console.log(err);
            var stream = fs.createReadStream('public/contract.pdf');
            response.setHeader('Content-type', 'application/pdf');
            stream.pipe(response);
            response.send('/static/contract.pdf');
        });

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