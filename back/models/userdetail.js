module.exports = (sequelize, DataTypes) => {
  const Userdetail = sequelize.define('Userdetail', {
    rematchingRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    endTime: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    friendsGender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    friendsAge: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    friendsCareer: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    friendsRole: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Userdetail.associate = (db) => {
  };
  return Userdetail;
}