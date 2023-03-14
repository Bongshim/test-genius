const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, dataType) => {
  const transactions = sequelize.define('transactions', {
    amount: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    status: {
      type: dataType.ENUM('success', 'failed'),
      allowNull: false,
    },
    paymentMethod: {
      type: dataType.ENUM('paystack', 'bank'),
      allowNull: false,
    },
    paymentReference: {
      type: dataType.STRING,
      allowNull: false,
    },
    reason: {
      type: dataType.STRING,
      allowNull: false,
    },
  });

  sequelizePaginate.paginate(transactions);

  return transactions;
};
