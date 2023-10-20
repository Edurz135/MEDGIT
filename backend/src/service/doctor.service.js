const { Models } = require("../db.js");
// Trae citas pasadas: fecha, tiempo, tipo, diagnostico y comentario
const getPastAppointmentsService = async (DoctorId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ['date', 'time', 'type', 'diagnostic'],
      where: {
        DoctorId: DoctorId,
      },
      include: [
        {
          model: Models.ExaMed,
          attributes: ['comment'],
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
    return appointments
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getPastAppointmentsService,
};