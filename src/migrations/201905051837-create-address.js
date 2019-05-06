'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Addresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
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
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
            });
        },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('Addresses');
    }
};