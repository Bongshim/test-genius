module.exports = (sequelize, dataType) => {
  const subscription = sequelize.define('subscription', {
    status: {
      type: dataType.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive',
    },
    amount: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    endDate: {
      type: dataType.DATE,
      allowNull: false,
    },
  });

  return subscription;
};
