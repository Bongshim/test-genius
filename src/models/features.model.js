module.exports = (sequelize, dataType) => {
  const features = sequelize.define('features', {
    text: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
  });

  return features;
};
