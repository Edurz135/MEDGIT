const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


const Doctor = require("../models/doctor.model.js")(sequelize, Sequelize);
const Patient = require("../models/patient.model.js")(sequelize, Sequelize);
const Appointment = require("../models/appointment.model.js")(sequelize, Sequelize);
const LabAnalyst = require("../models/labAnalyst.model.js")(sequelize,Sequelize);
const TipExMed = require("../models/tipoexamed.model.js")(sequelize,Sequelize);
const ExaMed = require("../models/examedico.model.js")(sequelize,Sequelize);
const Medicine = require("../models/medicine.model.js")(sequelize,Sequelize);
const Allergy = require("../models/allergy.model.js")(sequelize,Sequelize);
const ContenMedAle = require("../models/contenMedAle.model.js")(sequelize, Sequelize);
const ContenMedCi = require("../models/contenMedCi.model.js")(sequelize, Sequelize);
const ContenPacAle = require("../models/contenPacAle.model.js")(sequelize, Sequelize);




async function register1() {
    // Insert a new Doctor record.
    const doctor = await Doctor.create({
        name: "John Doe",
        lastName: "MD",
        email: "j0loln.doe@example.com",
        password: "password",
        identityDoc: 123489,
        nroColegiatura: 123456,
        gender: "Male",
        phone: 123450,
    });

    // Insert a new Patient record.
    const patient = await Patient.create({
        name: "Jane Doe",
        lastName: "Patient",
        email: "jane.doe@example.com",
        password: "password",
        identityDoc: 9876321,
        gender: "Female",
        phone: 987610,
    });

    // Insert a new Appointment record.
    const appointment = await Appointment.create({
        date: new Date(),
        time: "10:00 AM",
        type: "Annual checkup",
        diagnostic: "None",
        doctorId: 1,
        patientId: 1,
    });

    // Insert a new LabAnalyst record.
    const labAnalyst = await LabAnalyst.create({
        name: "Michael Smith",
        lastName: "LabAnalyst",
        email: "michael.smith@example.com",
        password: "password",
        identityDoc: 34901,
        nroColegiatura: 789012,
        gender: "Male",
        phone: 39012,
    });

    // Insert a new TipExMed record.
    const tipExMed = await TipExMed.create({
        name: "Blood test",
    });

    // Insert a new ExaMed record.
    const exaMed = await ExaMed.create({
        state: 0, // Pending
        comment: "None",
        doctorId: doctor.id,
        patientId: patient.id,
        labAnalystId: 1,
        tipExMedId: 1,
    });

    // Insert a new Medicine record.
    const medicine = await Medicine.create({
        name: "Acetaminophen",
        dose: "500mg",
        instruction: "Take two tablets every four to six hours as needed for pain or fever.",
        description: "A pain reliever and fever reducer.",
    });

    // Insert a new Allergy record.
    const allergy = await Allergy.create({
        name: "Penicillin",
        description: "A severe allergic reaction.",
    });

    // Insert a new ContenMedAle record.
    const contenMedAle = await ContenMedAle.create({
        doctorId: 1,
        allergyId: 1,
    });

    // Insert a new ContenMedCi record.
    const contenMedCi = await ContenMedCi.create({
        appointmentId: 1,
        medicineId: 1,
    });

    // Insert a new ContenPacAle record.
    const contenPacAle = await ContenPacAle.create({
        patientId: 1,
        allergyId: 1,
    });
}
register1().then(() => {
    console.log('Data has been registered successfully.');
}).catch((error) => {
    console.error('An error occurred:', error);
});