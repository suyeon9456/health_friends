module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    permission: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isPermitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Schedule.associate = (db) => {
    db.Schedule.belongsTo(db.User, { as: 'User', foreignKey: 'UserId' });
    db.Schedule.belongsTo(db.User, { as: 'Friend', foreignKey: 'FriendId' });
    db.Schedule.belongsTo(db.Gym);
  };
  return Schedule;
}