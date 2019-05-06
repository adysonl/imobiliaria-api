'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Properties', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hasGarage: {
            type: DataTypes.BOOLEAN
        },
        addressId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
               model: 'Addresses',
                key: 'id',
                as: 'addressId',
            }
        },
        locatorId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'Clients',
                key: 'id',
                as: 'locatorId',
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
        return queryInterface.dropTable('Properties');
    }
};