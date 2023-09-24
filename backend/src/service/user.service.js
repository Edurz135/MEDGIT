const { Paciente, Medico } = require("../db.js");

const registerPacienteApi = async (username, password) => {
  try {
    const registeredUser = await Paciente.create({
      nombre: username,
      apellido: username,
      correo: username,
      contrasena: password,
      dni: 123,
      genero: "masculino",
      celular: 980123456,
    });
    return registeredUser;
  } catch (e) {
    throw Error("Error while creating User");
  }
};

const registerMedicoApi = async (username, password) => {
  try {
    const registeredUser = await Medico.create({
      nombre: username,
      apellido: username,
      correo: username,
      contrasena: password,
      dni: 123,
      genero: "masculino",
      celular: 980123456,
    });
    return registeredUser;
  } catch (e) {
    throw Error("Error while creating User");
  }
};

const getPacienteApi = async (username) => {
  try {
    const paciente = await Paciente.findOne({
      where: { nombre: username },
    });
    return paciente;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

const getMedicoApi = async (username) => {
  try {
    const paciente = await Medico.findOne({
      where: { nombre: username },
    });
    return paciente;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

module.exports = {
  registerMedicoApi,
  registerPacienteApi,
  getPacienteApi,
  getMedicoApi
};
