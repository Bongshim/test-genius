module.exports = (sequelize, dataType) => {
  const testIntro = sequelize.define('test_intro', {
    text: {
      type: dataType.STRING,
      allowNull: false,
    },
    videoUrl: {
      type: dataType.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: dataType.STRING,
      allowNull: false,
    },
  });

  return testIntro;
};
