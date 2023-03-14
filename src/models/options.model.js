module.exports = (sequelize, dataType) => {
  const options = sequelize.define('options', {
    text: {
      type: dataType.STRING,
      allowNull: false,
    },
  });

  return options;
};
