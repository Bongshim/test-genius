const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, dataType) => {
  const promotions = sequelize.define('promotions', {
    name: {
      type: dataType.STRING,
      allowNull: false,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
    },
    value: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    code: {
      type: dataType.STRING,
      allowNull: false,
    },
    status: {
      type: dataType.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive',
    },
    validFrom: {
      type: dataType.DATE,
      allowNull: false,
    },
    validTo: {
      type: dataType.DATE,
      allowNull: false,
    },
  });

  sequelizePaginate.paginate(promotions);

  return promotions;
};
