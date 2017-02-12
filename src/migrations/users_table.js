module.exports = {
  up( queryInterface, Sequelize ) {
    return queryInterface.createTable( 'User', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      icon: {
        allowNull: true,
        type: Sequelize.BLOB,
      },
      win_num: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lose_num: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tie_num: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable( 'User' );
  },
};
