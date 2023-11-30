module.exports = (sequelize, Sequelize) => {
  // Es un laboratorio en sí, le decimos analista porque es el que analiza los exámenes
  const LabAnalyst = sequelize.define("LabAnalyst", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return LabAnalyst;
};
  