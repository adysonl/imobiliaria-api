const Sequelize = require('sequelize');
const sequelize = require('../database/index');
const Immobile = require('../models/immobile')
const user = require('../models/user');

const contract = sequelize.define('contracts', {
    renter: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key:'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    locator: {
        type: Sequelize.INTEGER,
        references: {
            model: Immobile,
            key:'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    immobile: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key:'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    typeContract:{
        type: Sequelize.STRING
    }
});

//contract.sync();

module.exports = contract;