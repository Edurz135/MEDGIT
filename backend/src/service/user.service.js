const { Models } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerPatientService = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = await Models.Patient.create({
      name: email,
      lastName: email,
      email: email,
      password: hashedPassword,
      identityDoc: 123,
      gender: "masculino",
      phone: 980123456,
    });
    return patient;
  } catch (e) {
    throw Error("Error while creating User");
  }
};

const registerDoctorService = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Models.Doctor.create({
      name: username,
      lastName: username,
      email: username,
      password: hashedPassword,
      identityDoc: 123,
      gender: "masculino",
      phone: 980123456,
    });
    return doctor;
  } catch (e) {
    throw Error("Error while creating User");
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
    return accessToken;
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

module.exports = {
  registerPatientService,
  registerDoctorService,
  getPatientService,
  getDoctorService,
  loginPatientService,
};
