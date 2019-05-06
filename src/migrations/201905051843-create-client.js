'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Clients', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nationalType: {
            type: DataTypes.ENUM,
            values: ['individual', 'company'],
            allowNull: false
        },
        nationalId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        career: {
            type: DataTypes.STRING
        },
        rg: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
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
        return queryInterface.dropTable('Clients');
    }
};