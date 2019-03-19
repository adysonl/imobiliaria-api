const Sequelize = require('sequelize');
const sequelize = require('../database/index');
const Immobile = require('../models/immobile');
const Client = require('../models/client');

const Contract = sequelize.define('contracts', {
    renter: {
        type: Sequelize.INTEGER,
        references: {
            model: Client,
            key:'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    locator: {
        type: Sequelize.INTEGER,
        references: {
            model: Client,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    immobile: {
        type: Sequelize.INTEGER,
        references: {
            model: Immobile,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    guarantor: {
        type: Sequelize.INTEGER,
        references: {
            model: Client,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    status: {
        type: Sequelize.ENUM,
        values: ['active', 'expired', 'renewed']
    },
    value: {
        type: Sequelize.DOUBLE        
    },
    condo:  {
        type: Sequelize.DOUBLE
    },
    startDate: {
        type: Sequelize.DATE
    },
    endDate: {
        type: Sequelize.DATE
    },
    paymentDay: {
        type: Sequelize.INTEGER
    },
    hasGarage: {
        type: Sequelize.BOOLEAN
    },
    garageValue: {
        type: Sequelize.DOUBLE
    }
});

Contract.sync();

module.exports = Contract;