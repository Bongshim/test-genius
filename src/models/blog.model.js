const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, dataType) => {
  const blog = sequelize.define('blog', {
    title: {
      type: dataType.STRING,
      allowNull: false,
    },
    content: {
      type: dataType.STRING(5000),
      allowNull: false,
    },
    slug: {
      type: dataType.STRING,
      allowNull: false,
    },
    status: {
      type: dataType.ENUM('draft', 'published'),
      allowNull: false,
      defaultValue: 'draft',
    },
  });

  sequelizePaginate.paginate(blog);

  return blog;
};
