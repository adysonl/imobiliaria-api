const Sequelize = require('sequelize');
const sequelize = require('../database/index');

const user = sequelize.define('users', {
    name: {
        type: Sequelize.STRING
    },
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

user.sync();
module.exports = user;