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
const Medico = require("./models/medico.model.js")(sequelize, Sequelize);
const Paciente = require("./models/paciente.model.js")(sequelize, Sequelize);
const Cita = require("./models/cita.model.js")(sequelize, Sequelize);

// Associations
Cita.hasOne(Medico);
Cita.hasOne(Paciente);

module.exports = { db, Medico, Paciente, Cita };
