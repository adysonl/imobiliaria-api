'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Payments', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        dueDate: {
            type: DataTypes.DATE
        },
        paymentDate: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM,
            values: ['future', 'pending', 'late', 'paid']
        },
        fine: {
            type: DataTypes.DOUBLE
        },
        interest: {
            type: DataTypes.DOUBLE
        },
        contractId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'Contracts',
                key: 'id'
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
        return queryInterface.dropTable('Payments');
    }
};