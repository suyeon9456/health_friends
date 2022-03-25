module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define('Gym', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    addressRoad: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Gym.associate = (db) => {
    db.Gym.belongsToMany(db.User, { through: 'UserGym' });
    db.Gym.hasMany(db.Schedule);
  };
  return Gym;
}