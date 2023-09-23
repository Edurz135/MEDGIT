const dbConfig = require("./config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Storing models
db.medico = require("./models/medico.js")(sequelize, Sequelize);
db.paciente = require("./models/paciente.js")(sequelize, Sequelize);
db.cita = require("./models/cita.js")(sequelize, Sequelize);

// Associations
db.cita.hasOne(db.medico);
db.cita.hasOne(db.paciente);

module.exports = db;
