const Sequelize = require('sequelize');
const sequelize = require('../database/index');
const Client = require('../models/client');
const Address = require('../models/address');

const Immobile = sequelize.define('immobiles', {
    address: {
        type: Sequelize.INTEGER,
        references: {
            model: Address,
            key:'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
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