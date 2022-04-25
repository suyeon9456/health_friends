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
    db.Schedule.belongsTo(db.User, { as: 'Requester', foreignKey: 'UserId' });
    db.Schedule.belongsTo(db.User, { as: 'Receiver', foreignKey: 'FriendId' });
    db.Schedule.belongsTo(db.Gym);
    db.Schedule.belongsTo(db.Schedule, { as: 'Rematch' }); // schedule.addRematch 생성
    db.Schedule.belongsTo(db.Cancel, { foreignKey: 'CancelId' });
  };
  return Schedule;
}