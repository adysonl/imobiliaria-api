const Sequelize = require('sequelize');
const sequelize = require('../database/index');
const Client = require('../models/client');

const Immobile = sequelize.define('immobiles', {
    address: {
        type: Sequelize.STRING
    },
    bedrooms: {
        type: Sequelize.STRING
    },
    locator: {
        type: Sequelize.INTEGER,
        references: {
            model: Client,
            key:'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

Immobile.sync();
module.exports = Immobile;