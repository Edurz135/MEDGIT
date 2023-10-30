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

    // Insert a new Appointment record.
    const appointment = await Appointment.create({
        date: new Date(),
        time: "10:00 AM",
        type: "Annual checkup",
        diagnostic: "None",
        doctorId: 1,
        PatientId: 1,
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
// Se tienen que tener creados los usuarios en la base de datos
// Para medicos y pacientes
async function registerMoreData() {
    // Insert a new TipExMed record.
    const tipExMed1 = await TipExMed.create({
        name: "Rayos X",
    });
    const tipExMed2 = await TipExMed.create({
        name: "Resonancia",
    });
    // Insert a new Medicine record.
    const medicine1 = await Medicine.create({
        name: "Celecoxib",
        dose: "500mg",
        instruction: "3 pastillas diarias, cada 8 horas",
        description: "Para alergia",
    });

    // Insert a new Medicine record.
    const medicine2 = await Medicine.create({
        name: "Panadol",
        dose: "500mg",
        instruction: "2 pastillas  dia y noche",
        description: "Disminuir el malestar",
    });
    // Insert a new Appointment record.
    const appointment1 = await Appointment.create({
        date: new Date(),
        time: "11:00 AM",
        type: "Todo Nice",
        diagnostic: "None",
        doctorId: 5,
        patientId: null,
    });

    const appointment2 = await Appointment.create({
        date: new Date(),
        time: "12:00 AM",
        type: "Todo Nice",
        diagnostic: "None",
        doctorId: 5,
        patientId: null,
    });
    const appointment3 = await Appointment.create({
        date: new Date(),
        time: "9:00 AM",
        type: "Todo Nice",
        diagnostic: "None",
        doctorId: 5,
        patientId: null,
    });
    const appointment4 = await Appointment.create({
        date: new Date(),
        time: "11:00 AM",
        type: "Todo Nice",
        diagnostic: "None",
        doctorId: 5,
        patientId: null,
    });
    
    // Insert a new ExaMed record.
    const exaMed = await ExaMed.create({
        state: 0, // Pending
        comment: "None",
        
        tipExMedId: 1,
    });

    const exaMed2 = await ExaMed.create({
        state: 0, // Pending
        comment: "None",
       
        tipExMedId: 1,
    });
    const exaMed3 = await ExaMed.create({
        state: 0, // Pending
        comment: "None",
        
        tipExMedId: 3,
    });
    // Insert a new ContenMedCi record.
    const contenMedCi1 = await ContenMedCi.create({
        appointmentId: 5,
        medicineId: 1,
    });
    // Insert a new ContenMedCi record.
    const contenMedCi2 = await ContenMedCi.create({
        appointmentId: 6,
        medicineId: 1,
    });
    const contenMedCi3 = await ContenMedCi.create({
        appointmentId: 7,
        medicineId: 2,
    });
    const contenMedCi4 = await ContenMedCi.create({
        appointmentId: 8,
        medicineId: 3,
    });
}
async function registerMoreDataProve() {

    // Insert a new Appointment record.
    const appointment1 = await Appointment.create({
        date: new Date(),
        time: "11:00 AM",
        type: "Todo Nice",
        diagnostic: "None",
        DoctorId: 7,
        PatientId: 3,
    });
    const appointment1ID=appointment1.id;
    const appointment2 = await Appointment.create({
        date: new Date(),
        time: "12:00 AM",
        type: "Todo Nice",
        diagnostic: "None",
        DoctorId: 7,
        PatientId: 3,
    });
    const appointment2ID=appointment2.id;
    const appointment3 = await Appointment.create({
        date: new Date(),
        time: "9:00 AM",
        type: "Todo Nice",
        diagnostic: "None",
        DoctorId: 7,
        PatientId: 3,
    });
    const appointment3ID=appointment3.id;
    const appointment4 = await Appointment.create({
        date: new Date(),
        time: "11:00 AM",
        type: "Todo Nice",
        diagnostic: "None",
        DoctorId: 7,
        
    });
    const appointment4ID=appointment4.id;
    console.log(appointment1ID);
    console.log(appointment2ID);
    console.log(appointment3ID);
    console.log(appointment4ID);
    // Insert a new ExaMed record.
    const exaMed1 = await ExaMed.create({
        state: 0, // Pending
        comment: "None",
        
        tipExMedId: 1,
        AppointmentId:appointment1ID,
    });

    const exaMed2 = await ExaMed.create({
        state: 0, // Pending
        comment: "None",
        
        tipExMedId: 1,
        AppointmentId:appointment2ID,
    });
    const exaMed3 = await ExaMed.create({
        state: 0, // Pending
        comment: "None",
        appointmentId: appointment2ID
    });
    const exaMed4 = await ExaMed.create({
        state: 0, // Pending
        comment: "None",
        
        tipExMedId: 3,
        AppointmentId:appointment4ID,
    });
    
}
registerMoreDataProve().then(() => {
    console.log('Data has been registered successfully.');
}).catch((error) => {
    console.error('An error occurred:', error);
});
/*register1().then(() => {
    console.log('Data has been registered successfully.');
}).catch((error) => {
    console.error('An error occurred:', error);
});*/