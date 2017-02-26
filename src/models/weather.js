module.exports = ( sequelize, DataTypes ) => {
  const Weather = sequelize.define( 'Weather', {
    temperature: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    humidity: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    PM2_5: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    SO2: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { freezeTableName: true } );

  return Weather;
};
