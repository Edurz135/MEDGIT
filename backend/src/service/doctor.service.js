const { Models } = require("../db.js");
const bcrypt = require("bcrypt");

// Trae citas pasadas: fecha, tiempo, tipo, diagnostico y comentario
const getPastAppointmentsService = async (DoctorId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: [
        "startDate",
        "endDate",
        "intervalDigit",
        "state",
        "diagnostic",
      ],
      where: {
        DoctorId: DoctorId,
        pending: false,
      },
      include: [
        {
          model: Models.Patient,
          attributes: ["name", "lastName"],
        },
      ],
    });

    return appointments;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getFutureAppointmentsService = async (DoctorId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: [
        "startDate",
        "endDate",
        "intervalDigit",
        "state",
        "diagnostic",
      ],
      where: {
        DoctorId: DoctorId,
        pending: true,
      },
      include: [
        {
          model: Models.Patient,
          attributes: ["name", "lastName"],
        },
      ],
    });

    return appointments;
  } catch (e) {
    throw new Error(e.message);
  }
};
// Trae los detalles de una cita

const getAppointmentDetailsService = async (id) => {
  try {
    const appointment = await Models.Appointment.findOne({
      attributes: [
        "startDate",
        "endDate",
        "intervalDigit",
        "state",
        "diagnostic",
      ],
      where: {
        id: id,
      },
      include: [
        //Examen medico y tipo de examen
        {
          model: Models.ExaMed,
          attributes: ["comment"],
          include: [
            {
              model: Models.TipExMed,
              attributes: ["name"],
            },
          ],
        },
      ],
      include: [
        // Medicamentos
        {
          model: Models.Medicine,
          attributes: ["name", "description", "dose"],
        },
      ],
      include: [
        // Paciente
        {
          model: Models.Patient,
          attributes: ["name", "lastName", "email", "phone"],
        },
      ],
    });

    return appointment;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getAvailabilityService = async (id) => {
  try {
    const result = await Models.Doctor.findOne({
      attributes: [
        "mondayDisponibility",
        "tuesdayDisponibility",
        "wednesdayDisponibility",
        "thursdayDisponibility",
        "fridayDisponibility",
        "saturdayDisponibility",
        "sundayDisponibility",
      ],
      where: {
        id: id,
      },
    });

    return result;
  } catch (e) {
    throw new Error(e.message);
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

const updateAvailabilityService = async (id, body) => {
  try {
    const result = await Models.Doctor.findOne({
      where: {
        id: id,
      },
    });

    await result.update({
      mondayDisponibility: body.mondayDisponibility,
      tuesdayDisponibility: body.tuesdayDisponibility,
      wednesdayDisponibility: body.wednesdayDisponibility,
      thursdayDisponibility: body.thursdayDisponibility,
      fridayDisponibility: body.fridayDisponibility,
      saturdayDisponibility: body.saturdayDisponibility,
      sundayDisponibility: body.sundayDisponibility,
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

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getUpdateDoctorService = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const doctor = await Models.Doctor.findOne({
      where: {
        id: DoctorId,
      },
    });
    await doctor.update({
      email: body.email,
      password: hashedPassword,
      phone: body.phone,
    });
    return doctor;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getVisualiseDoctorService = async (DoctorId) => {
  try {
    const doctor = await Models.Doctor.findOne({
      attributes: [
        "name",
        "lastName",
        "email",
        "password",
        "identityDoc",
        "nroColegiatura",
        "gender",
        "phone",
      ],
      where: {
        id: DoctorId,
      },
    });
    return doctor;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getDoctorsService = async (ids = []) => {
  try {
    const doctor = await Models.Doctor.findAll({
      where: { identityDoc: ids },
    });
    return doctor;
  } catch (e) {
    throw Error("Error while finding a Patient");
  }
};

module.exports = {
  getPastAppointmentsService,
  getFutureAppointmentsService,
  getAppointmentDetailsService,
  getAvailabilityService,
  getUpdateDoctorService,
  getVisualiseDoctorService,
  updateAvailabilityService,
  getDoctorsService
};
