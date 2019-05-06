
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
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
        }
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.Contract, {
          onDelete: 'CASCADE',
          foreignKey: 'contractId',
          as: 'contract'
        });
    };

    return Payment;
};
