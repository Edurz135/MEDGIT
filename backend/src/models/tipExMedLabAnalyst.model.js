module.exports = (sequelize, Sequelize) => {
    const TipExMed = sequelize.define("TipExMedLabAnalyst", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }
    });
    return TipExMed;
  };
    