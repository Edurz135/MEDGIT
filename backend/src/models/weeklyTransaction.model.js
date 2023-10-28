module.exports = (sequelize, Sequelize) => {
  const WeeklyTransaction = sequelize.define("WeeklyTransaction", {
    weekOf: {
      type: Sequelize.DATEONLY,
      primaryKey: true,
    },
    executed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return WeeklyTransaction;
};
