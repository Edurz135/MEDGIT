module.exports = (sequelize, Sequelize) => {
  const Medicine = sequelize.define("Medicine", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    dose: {
      type: Sequelize.STRING,
    },
    instruction: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Medicine;
};
  