module.exports = (sequelize, dataType) => {
  const tag = sequelize.define('tag', {
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

  return tag;
};
