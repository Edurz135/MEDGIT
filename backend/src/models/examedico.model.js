module.exports = (sequelize, Sequelize) => {
  const ExaMed = sequelize.define("ExaMed", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    state: {
      type: Sequelize. INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
    },
  });
  return ExaMed;
};
  