module.exports = ( sequelize, DataTypes ) => {
  const User = sequelize.define( 'User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    icon: {
      allowNull: true,
      type: DataTypes.BLOB,
    },
    win_num: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    lose_num: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    tie_num: {
      allowNull: false,
      type: DataTypes.INTEGER,
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

  return User;
};
