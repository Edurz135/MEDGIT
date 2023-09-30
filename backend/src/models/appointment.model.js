// Cita
module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("Appointment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATE,
    },
    time: {
      type: Sequelize.TIME,
    },
    type: {
      type: Sequelize.STRING,
    },
    diagnostic: {
      type: Sequelize.STRING,
    },
  });

  return Appointment;
};
