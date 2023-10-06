const { Models } = require("../db.js");
const getPastAppointmentsServices = async (idDoctor) => {
    try {
      const appointments = await Models.Appointment.findAll({
        where: { id_Doctor: idDoctor },
        //falta agregar el token temporal
      });
      return appointments;
    } catch (e) {
      throw Error("Error while finding previous appointments");
    }
  };
  module.exports = {
    getPastAppointmentsServices
  };