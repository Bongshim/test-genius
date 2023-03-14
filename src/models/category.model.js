module.exports = (sequelize, dataType) => {
  const category = sequelize.define('category', {
    name: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
  });

  return category;
};
