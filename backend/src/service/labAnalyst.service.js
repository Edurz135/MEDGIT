const { Models } = require("../db.js");
const getPastAppointmentsServices = async (idLabAnalyst) => {
    try {
      const appointments = await Models.Appointment.findAll({
        where: { id_LabAnalista: idLabAnalyst },
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