module.exports = (sequelize, dataType) => {
  const question = sequelize.define('question', {
    text: {
      type: dataType.STRING,
      allowNull: false,
    },
    type: {
      type: dataType.ENUM('single', 'multiple', 'essay', 'coding'),
      allowNull: false,
    },
    duration: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    icon: {
      type: dataType.STRING,
      allowNull: false,
    },
    googleSearch: {
      type: dataType.BOOLEAN,
      allowNull: false,
    },
    console: {
      type: dataType.BOOLEAN,
      allowNull: false,
    },
    pointWeight: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });

  return question;
};
