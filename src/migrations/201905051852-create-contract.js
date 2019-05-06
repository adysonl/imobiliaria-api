'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Contracts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'expired', 'renewed']
        },
        value: {
            type: DataTypes.DOUBLE        
        },
        condo:  {
            type: DataTypes.DOUBLE
        },
        startDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        },
        paymentDay: {
            type: DataTypes.INTEGER
        },
        garageValue: {
            type: DataTypes.DOUBLE
        },
        renterId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'Clients',
                key: 'id',
                as: 'renterId',
            }
        },
        propertyId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'Properties',
                key: 'id',
                as: 'propertyId',
            }
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
        return queryInterface.dropTable('Contracts');
    }
};