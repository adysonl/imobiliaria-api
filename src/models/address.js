module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        street: {
            type: DataTypes.STRING
        },
        streetNumber: {
            type: DataTypes.STRING
        },
        neighbour: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        complement: {
            type: DataTypes.STRING
        }
    });

    return Address;
};