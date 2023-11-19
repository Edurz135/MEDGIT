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
const LabAnalyst = require("./models/labAnalyst.model.js")(sequelize, Sequelize);
const TipExMed = require("./models/tipoexamed.model.js")(sequelize, Sequelize);
const ExaMed = require("./models/examedico.model.js")(sequelize, Sequelize);
const Medicine = require("./models/medicine.model.js")(sequelize, Sequelize);
const Allergy = require("./models/allergy.model.js")(sequelize, Sequelize);
const ContenMedAle = require("./models/contenMedAle.model.js")(sequelize, Sequelize);
const ContenMedCi = require("./models/contenMedCi.model.js")(sequelize, Sequelize);
const ContenPacAle = require("./models/contenPacAle.model.js")(sequelize, Sequelize);
const Specialty = require("./models/specialty.model.js")(sequelize, Sequelize);
const WeeklyTransaction = require("./models/weeklyTransaction.model.js")(sequelize, Sequelize);
const Administrator = require("./models/administrator.model.js")(sequelize, Sequelize);

// Associations

//Uno a muchos --> 1 a N
Patient.hasMany(Appointment);
Doctor.hasMany(Appointment);
Appointment.hasMany(ExaMed);
TipExMed.hasMany(ExaMed);
Allergy.hasMany(Patient);
ExaMed.hasMany(LabAnalyst);
Doctor.belongsTo(Specialty);

//Muchos a muchos --> N a N
Medicine.belongsToMany(Appointment,{through: 'ContenMedCi'});
Appointment.belongsToMany(Medicine,{through: 'ContenMedCi'});

Appointment.belongsTo(Doctor);
Appointment.belongsTo(Patient);

Allergy.hasMany(ContenPacAle);
Patient.hasMany(ContenPacAle);  

Doctor.hasMany(ContenMedAle);
Allergy.hasMany(ContenMedAle);

//Modelos
Models.Doctor = Doctor;
Models.Patient = Patient;
Models.Appointment = Appointment;
Models.LabAnalyst = LabAnalyst;
Models.TipExMed = TipExMed;
Models.ExaMed = ExaMed;
Models.Medicine = Medicine;
Models.Allergy = Allergy;
Models.ContenMedAle = ContenMedAle;
Models.ContenMedCi = ContenMedCi;
Models.ContenPacAle = ContenPacAle;
Models.Specialty = Specialty;
Models.WeeklyTransaction = WeeklyTransaction;
Models.Administrator = Administrator;

module.exports = { db, Models };
