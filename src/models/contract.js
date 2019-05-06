module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define('Contract', {
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
        }
    });

    Contract.associate = (models) => {
        Contract.belongsTo(models.Property, {
          onDelete: 'CASCADE',
          foreignKey: 'propertyId',
          as: 'property'
        });
        Contract.belongsTo(models.Client, {
            foreignKey: 'renterId',
            as: 'renter',
            onDelete: 'CASCADE',
        });
    };

    return Contract;
};
