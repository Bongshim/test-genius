module.exports = (sequelize, dataType) => {
  const activeSubscription = sequelize.define('active_subscription', {
    availableTill: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });

  return activeSubscription;
};
