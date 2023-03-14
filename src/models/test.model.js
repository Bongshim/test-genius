const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, dataType) => {
  const test = sequelize.define('test', {
    title: {
      type: dataType.STRING,
      allowNull: false,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
    },
    logo: {
      type: dataType.STRING,
      allowNull: false,
    },
    status: {
      type: dataType.ENUM('active', 'inactive'),
      allowNull: false,
    },
    startDate: {
      type: dataType.DATE,
      allowNull: false,
    },
    endDate: {
      type: dataType.DATE,
      allowNull: false,
    },
    viewResult: {
      type: dataType.BOOLEAN,
      allowNull: false,
    },
    attempt: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    duration: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    passPercentage: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });
  sequelizePaginate.paginate(test);

  return test;
};
