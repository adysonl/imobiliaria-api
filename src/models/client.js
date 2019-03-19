const Sequelize = require('sequelize');
const sequelize = require('../database/index');

const Client = sequelize.define('clients', {
    name: {
        type: Sequelize.STRING
    },
    nationalType: {
        type: Sequelize.ENUM,
        values: ['individual', 'company']
    },
    nationalId: {
        type: Sequelize.STRING
    },
    career: {
        type: Sequelize.STRING
    },
    rg: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

Client.sync();
module.exports = Client;