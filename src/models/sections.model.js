module.exports = (sequelize, dataType) => {
  const section = sequelize.define('section', {
    title: {
      type: dataType.STRING,
      allowNull: false,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
    },
  });

  return section;
};
