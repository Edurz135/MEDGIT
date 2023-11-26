module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("Appointment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    intervalDigit: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    state: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pending:{
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    diagnostic: {
      type: Sequelize.STRING(500),
    },
  });

  return Appointment;
};
