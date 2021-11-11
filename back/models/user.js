module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    age: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    career: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  User.associate = (db) => {
    db.User.belongsToMany(db.Gym, { through: 'UserGym' });
    db.User.belongsToMany(db.User, { through: 'Like', as: 'Liker', foreignKey: 'LikedId' });
    db.User.belongsToMany(db.User, { through: 'Like', as: 'Liked', foreignKey: 'LikerId' });
    db.User.hasMany(db.Schedule, { as: 'Me', foreignKey: 'UserId' });
    db.User.hasMany(db.Schedule, { as: 'Friend', foreignKey: 'FriendId' });
    db.User.hasOne(db.Userdetail);
  };
  return User;
};