module.exports = (sequelize, DataTypes) => {
  const ScheduleDetail = sequelize.define('ScheduleDetail', {
    isCanceled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  ScheduleDetail.associate = (db) => {
    db.ScheduleDetail.belongsTo(db.Schedule);
  };
  return ScheduleDetail;
}
