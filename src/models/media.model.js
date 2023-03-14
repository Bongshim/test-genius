const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, dataType) => {
  const media = sequelize.define('media', {
    type: {
      type: dataType.ENUM('image', 'video'),
      allowNull: false,
    },
    url: {
      type: dataType.STRING,
      allowNull: false,
    },
    publicUrl: {
      type: dataType.STRING,
      allowNull: false,
    },
  });

  sequelizePaginate.paginate(media);

  return media;
};
