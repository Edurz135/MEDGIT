module.exports = (sequelize, Sequelize) => {
    const TipExMed = sequelize.define("TipExMed ", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    });
    return TipExMed;
  };
  