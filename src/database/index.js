const Sequelize = require('sequelize');

module.exports = new Sequelize('imobdb2', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
});


