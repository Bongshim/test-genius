module.exports = (sequelize, dataType) => {
  const subscriptionPlan = sequelize.define('subscription_plan', {
    name: {
      type: dataType.STRING,
      allowNull: false,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
    },
    price: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    duration: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    status: {
      type: dataType.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive',
    },
  });

  return subscriptionPlan;
};
