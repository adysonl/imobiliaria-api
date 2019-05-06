module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
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
        }
    });

    Client.associate = (models) => {
        Client.belongsTo(models.Address, {
           onDelete: 'CASCADE',
           foreignKey: 'addressId',
           as: 'address'
        });
    }

    return Client;
  };