module.exports = {
  up( queryInterface, Sequelize ) {
    return queryInterface.createTable( 'Weather', {
      temperature: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      humidity: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      PM2_5: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      SO2: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    } );
  },

  down( queryInterface ) {
    return queryInterface.dropTable( 'Weather' );
  },
};
