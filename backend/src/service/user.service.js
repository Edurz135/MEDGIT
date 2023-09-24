const { Paciente, Medico } = require("../db.js");

const getAllUsersApi = () => {
  // realizar búsqueda en bd

  try {
    // var users = await User.find(query)
    // return users;
    return ["asdf"];
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Users");
  }
};

const registerUserApi = async (username, password) => {
  try {
    console.log(username, password, Paciente);
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
    console.log(username)
    const paciente = await Paciente.findOne({
      where: { nombre: username },
    });
    return paciente;
  } catch (e) {
    throw Error("Error while finding a User");
  }
};

const getMedicoApi = async (username) => {};

module.exports = {
  getAllUsersApi,
  registerUserApi,
  registerMedicoApi,
  registerPacienteApi,
  getPacienteApi,
};
