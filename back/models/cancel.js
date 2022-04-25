module.exports = (sequelize, DataTypes) => {
  const Cancel = sequelize.define('Cancel', {
    isCanceled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Cancel.associate = (db) => {
    // db.Cancel.belongsTo(db.Schedule);
  };
  return Cancel;
}
