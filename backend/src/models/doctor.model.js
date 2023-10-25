module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("Doctor", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    lastName: {
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
    },
    identityDoc: {
      type: Sequelize.INTEGER,
    },
    nroColegiatura: {
      type: Sequelize.INTEGER,
    },
    gender: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    //Strings de 48 carácteres 000000011111111111000000000000000000000000000000
    mondayDisponibility: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tuesdayDisponibility: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    wednesdayDisponibility: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    thursdayDisponibility: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    fridayDisponibility: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    saturdayDisponibility: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    sundayDisponibility: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  
  return Doctor;
};
