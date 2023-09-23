module.exports = (sequelize, Sequelize) => {
  const Model1 = sequelize.define("model", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Model1;
};
