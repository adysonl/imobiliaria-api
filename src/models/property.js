module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hasGarage: {
            type: DataTypes.BOOLEAN
        },
    });

    Property.associate = (models) => {
        Property.belongsTo(models.Client, {
          foreignKey: 'locatorId',
          onDelete: 'CASCADE',
          as: 'locator'
        });
        Property.belongsTo(models.Address, {
            onDelete: 'CASCADE',
            foreignKey: 'addressId',
            as: 'address'

         });
    };

    return Property;
};