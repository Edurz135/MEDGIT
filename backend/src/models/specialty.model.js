module.exports = (sequelize, Sequelize) => {
  const Specialty = sequelize.define("Specialty", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Specialty;
};
