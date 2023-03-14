const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, dataType) => {
  const testResult = sequelize.define('test_result', {
    duration: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });

  sequelizePaginate.paginate(testResult);

  return testResult;
};
