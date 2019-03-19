const Sequelize = require('sequelize');
const sequelize = require('../database/index');
const Contract  = require('../models/contract');

const Payment = sequelize.define('payments', {
   contract: { 
        type: Sequelize.INTEGER,
        references: {
            model: Contract,
            key:'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }, 
    dueDate: {
        type: Sequelize.DATE
    },
    paymentDate: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.ENUM,
        values: ['future', 'pending', 'late', 'paid']
    },
    fine: {
        type: Sequelize.DOUBLE
    },
    interest: {
        type: Sequelize.DOUBLE
    }
});

Payment.sync();
module.exports = Payment;