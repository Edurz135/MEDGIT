const { Models } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
require("dotenv").config();

const registerPatientService = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const identityDoc = parseInt(body.identityDoc);

    const patient = await Models.Patient.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      identityDoc: identityDoc,
      gender: body.gender,
      phone: 0,
    });
    return patient;
  } catch (e) {
    throw Error("Error while creating User: " + e);
  }
};

const registerDoctorService = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const identityDoc = parseInt(body.identityDoc);
    const nroColegiatura = parseInt(body.nroColegiatura);
    const SpecialtyId = parseInt(body.specialtyId) || 0;

    const doctor = await Models.Doctor.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      identityDoc: identityDoc,
      nroColegitura: nroColegiatura,
      gender: body.gender,
      phone: 999999999,
      SpecialtyId: SpecialtyId,
      mondayDisponibility: "001110110000",
      tuesdayDisponibility: "001110110000",
      wednesdayDisponibility: "001110110000",
      thursdayDisponibility: "001110110000",
      fridayDisponibility: "001110110000",
      saturdayDisponibility: "000000000000",
      sundayDisponibility: "000000000000",
    });

    return doctor;
  } catch (e) {
    throw Error("Error while creating User: " + e);
  }
};

const Intervals = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
];

// debe ser llamado cada lunes a las 0:00 horas
const deleteAllAppointmentsService = async () => {
  try {
    await Models.Appointment.destroy({ where: { state: 0 } });
  } catch (e) {
    throw Error("Error while creating all Appointments: " + e);
  }
};

// debe ser llamado cada lunes a las 0:00 horas
const createAllAppointmentsService = async () => {
  try {
    const doctors = await Models.Doctor.findAll({ attributes: ["id"] });
    doctors.map((doctor, idx) => {
      const doctorId = doctor.dataValues.id;
      createAppointmentsService(doctorId);
    });
  } catch (e) {
    throw Error("Error while creating all Appointments: " + e);
  }
};

const createAppointmentsService = async (doctorId) => {
  try {
    const doctor = await Models.Doctor.findOne({
      where: { id: doctorId },
    });

    const availabilities = [
      "mondayDisponibility",
      "tuesdayDisponibility",
      "wednesdayDisponibility",
      "thursdayDisponibility",
      "fridayDisponibility",
      "saturdayDisponibility",
      "sundayDisponibility",
    ];

    availabilities.map((key, idx) => {
      const curAvailability = doctor[key]; // "001110110000"
      const chars = curAvailability.split(""); // ["0", "0", "1", "1", ...]
      const curDate = dayjs().day(idx + 1); // get monday date of the week
      chars.map(async (char, idx) => {
        const interval = Intervals[idx].split(" - ");
        const startTime = interval[0].split(":");
        const endTime = interval[1].split(":");
        const startDate = curDate
          .set("hour", parseInt(startTime[0], 10))
          .set("minute", parseInt(startTime[1], 10));
        const endDate = curDate
          .set("hour", parseInt(endTime[0], 10))
          .set("minute", parseInt(endTime[1], 10));
        if (char == "1") {
          await Models.Appointment.create({
            startDate: startDate,
            endDate: endDate,
            state: 0,
            intervalDigit: idx,
            DoctorId: doctorId,
            PatientId: null,
          });
        }
      });
    });
  } catch (e) {
    throw Error("Error while creating Appointments: " + e);
  }
};

const registerLabAnalystService = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const identityDoc = parseInt(body.identityDoc);
    const nroColegiatura = parseInt(body.nroColegiatura);

    const LabAnalyst = await Models.LabAnalyst.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      identityDoc: identityDoc,
      nroColegitura: nroColegiatura,
      gender: body.gender,
      phone: 0,
    });
    return LabAnalyst;
  } catch (e) {
    throw Error("Error while creating User: " + e);
  }
};

const loginPatientService = async (email, password) => {
  try {
    const patient = await getPatientService(email);
    const match = await bcrypt.compare(password, patient.dataValues.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = await jwt.sign(
      JSON.stringify(patient),
      process.env.TOKEN_SECRET
    );
    return "Bearer " + accessToken;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

const loginDoctorService = async (email, password) => {
  try {
    const doctor = await getDoctorService(email);
    const match = await bcrypt.compare(password, doctor.dataValues.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = await jwt.sign(
      JSON.stringify(doctor),
      process.env.TOKEN_SECRET
    );
    return "Bearer " + accessToken;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

const loginLabAnalystService = async (email, password) => {
  try {
    const labAnalyst = await getLabAnalystService(email);
    const match = await bcrypt.compare(
      password,
      labAnalyst.dataValues.password
    );
    if (!match) throw new Error("Invalid credentials");

    const accessToken = await jwt.sign(
      JSON.stringify(labAnalyst),
      process.env.TOKEN_SECRET
    );
    return "Bearer " + accessToken;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

const getPatientService = async (email) => {
  try {
    const patient = await Models.Patient.findOne({
      where: { email: email },
    });
    return patient;
  } catch (e) {
    throw Error("Error while finding a Patient");
  }
};

const getDoctorService = async (email) => {
  try {
    const doctor = await Models.Doctor.findOne({
      where: { email: email },
    });
    return doctor;
  } catch (e) {
    throw Error("Error while finding a Doctor");
  }
};

const getLabAnalystService = async (email) => {
  try {
    const labAnalyst = await Models.LabAnalyst.findOne({
      where: { email: email },
    });
    return labAnalyst;
  } catch (e) {
    throw Error("Error while finding a LabAnalyst");
  }
};

module.exports = {
  registerPatientService,
  registerDoctorService,
  registerLabAnalystService,
  getPatientService,
  getDoctorService,
  getLabAnalystService,
  loginPatientService,
  loginDoctorService,
  loginLabAnalystService,
  createAppointmentsService,
  createAllAppointmentsService,
};
