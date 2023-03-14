const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, dataType) => {
  const testHistory = sequelize.define('test_history', {
    rating: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    status: {
      type: dataType.ENUM('completed', 'incomplete'),
      allowNull: false,
      defaultValue: 'incomplete',
    },
    feedback: {
      type: dataType.STRING,
      allowNull: false,
    },
    duration: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    attempt: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });

  sequelizePaginate.paginate(testHistory);

  return testHistory;
};
