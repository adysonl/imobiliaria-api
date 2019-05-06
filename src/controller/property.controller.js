const express = require('express');
const router = express.Router();
const models = require('../models/index');
const middleware = require('../middleweres/auth');

router.get('/', function(req, res) {
    models.Property.findAll({
        include: [
            {
                model: models.Client,
                as: 'locator'
            },
            {
                model: models.Address,
                as: 'address'
            }
        ],
        where: req.query
    }).then(properties => {
        res.send(properties);
    })
  });

router.get('/:id', function(req, res) {
    models.Property.findOne({
        include: [
            {
                model: models.Address,
                as: 'address'
            }
        ],
        where: req.params
    }).then(property => {
        if(property) {
            res.send(property);
        } else {
            res.send(req);
            res.json({error: 'property not found'});
        }
    });
});

router.post('', middleware.verify, function(req, res){
    try{
        models.Address.create(req.body.address).then( response => {
            req.body.addressId = response.dataValues.id;
            models.Property.create(req.body);
            return res.send({message: 'property created'});
        });

    }catch (err){
        console.log("||||||||||||");
        console.log(err);
        console.log("||||||||||||");
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', middleware.verify, function(req,res){
    models.Property.findByPk(req.params.id).then(property => {
        if(property){
            property.update(req.body, {where: req.params}).then(() => {
                res.send({message: 'property changed'});
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

router.delete('/:id', middleware.verify, function(req,res){
    models.Property.findByPk(req.params.id).then(property => {
        if(property){
            property.destroy({where: req.params}).then(() => {
                res.send({message: 'property removed'});
            })
        }else{
            res.json({error: "property not found"});
        }
    });
});

module.exports = app => app.use('/property', router);