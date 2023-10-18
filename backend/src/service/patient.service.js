const { Models } = require("../db.js");

// Trae citas pasadas: fecha, tiempo, tipo, diagnostico y comentario
const getPastAppointmentsService = async (PatientId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ["date", "time", "type", "diagnostic"],
      where: {
        PatientId: PatientId,
      },
      include: [
        {
          model: Models.ExaMed,
          attributes: ["comment"],
          where: {
            state: 0,
          },
        },
      ],
    });

    /* if (appointments == 0) {
      return [];
    } else {
      return appointments;
    } */
    return appointments;
  } catch (error) {
    throw new Error(e.message);
  }
};
module.exports = {
  getPastAppointmentsService,
};
