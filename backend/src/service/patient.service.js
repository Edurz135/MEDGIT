const { Models } = require("../db.js");
const getPastAppointmentsServices = async (idPatient) => {
    try {
      const appointments = await Models.Appointment.findAll({
        where: { id_Paciente: idPatient },
      });
      return appointments;
    } catch (e) {
      throw Error("Error while finding previous appointments");
    }
  };
  module.exports = {
    getPastAppointmentsServices
  };