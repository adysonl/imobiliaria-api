const Sequelize = require('sequelize');
const sequelize = require('../database/index');
const user = require('../models/user');

const immobile = sequelize.define('immobiles', {
    address: {
        type: Sequelize.STRING
    },
    bedrooms: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    },
    locator: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key:'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    size: {
        type: Sequelize.STRING
    }
});

//immobile.sync();
module.exports = immobile;