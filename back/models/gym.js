module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define('Gym', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    detailAddress: {
      type: DataTypes.STRING(100),
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