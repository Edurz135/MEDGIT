const dbConfig = require("./config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Storing models
const Models = {};
const Doctor = require("./models/doctor.model.js")(sequelize, Sequelize);
const Patient = require("./models/patient.model.js")(sequelize, Sequelize);
const Appointment = require("./models/appointment.model.js")(sequelize, Sequelize);

// Associations
Patient.hasOne(Appointment);
Doctor.hasOne(Appointment);

Models.Doctor = Doctor;
Models.Patient = Patient;
Models.Appointment = Appointment;

module.exports = { db, Models };
