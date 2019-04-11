const Address = sequelize.define('addresses', {
    street: {
        type: Sequelize.STRING
    },
    streetNumber: {
        type: Sequelize.STRING
    },
    neighbour: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    complement: {
        type: Sequelize.STRING
    }
});

Address.sync();
module.exports = Address;