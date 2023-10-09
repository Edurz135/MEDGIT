const { Models } = require("../db.js");
const getPastAppointmentsServices = async (idPatient) => {
  try {
    const appointments = await Models.Appointment.findAll({
      where: {
        id_Paciente: idPatient,
        attributes: ['date', 'time', 'type', 'diagnostic']
      }, include: {
        model: Models.ExaMed,
        attributes: ['id', 'state', 'comment'],
        where: {
          state: 0
        }
      }

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
const getFutureAppointmentsServices = async (idDoctor) => {
  try {
    const appointments = await Models.Appointment.findAll({
      where: {
        id_Doctor: idDoctor,
        attributes: ['date', 'time', 'type', 'diagnostic']
      }, include: {
        model: Models.ExaMed,
        attributes: ['id', 'state', 'comment'],
        where: {
          state: 1
        }
      }

      //falta agregar el token temporal
    });
    return appointments;
  } catch (e) {
    throw Error("Error while finding next appointments");
  }
};
module.exports = {
  getPastAppointmentsServices,
  getFutureAppointmentsServices
};