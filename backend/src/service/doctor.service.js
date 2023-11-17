const { Models } = require("../db.js");
const bcrypt = require("bcrypt");

// Trae citas pasadas: fecha, tiempo, tipo, diagnostico y comentario
const getPastAppointmentsService = async (DoctorId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ["date", "time", "type", "diagnostic"],
      where: {
        DoctorId: DoctorId,
        pending: false,
      },
      /* include: [
        {
          model: Models.ExaMed,
          attributes: ["comment"],
          where: {
            state: 0,
          },
        },
      ], */
    });

    return appointments;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getFutureAppointmentsService = async (DoctorId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ["date", "time", "type", "diagnostic"],
      where: {
        DoctorId: DoctorId,
        pending: true,
      },
      /* include: [
        {
          model: Models.ExaMed,
          attributes: ["comment"],
          where: {
            state: 1,
          },
        },
      ], */
    });

    return appointments;
  } catch (e) {
    throw new Error(e.message);
  }
};
// Trae los detalles de una cita

const getAppointmentDetails = async (id) => {
  try {
    const appointment = await Models.Appointment.findOne({
      attributes: ["date", "time", "type", "diagnostic"],
      where: {
        id: id,
      },
      include: [
        {
          model: Models.ExaMed,
          attributes: ["comment"],
          include:[{
            model: Models.TipExMed,
            attributes: ["name"],
          }]
        },
      ],
      include: [
        {
          model: Models.ContenMedCi,
          include: [
            {
              model: Models.Medicine,
              attributes: ["name", "description","dose"],
            }
          ]
        }
      ]
    });

    return appointment;
  } catch (e) {
    throw new Error(e.message);
  }
}
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
const getUpdateDoctorService = async (body) =>{
  try{
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const doctor = await Models.Doctor.findOne({
      where: {
        id: DoctorId,
      },
    });
    await doctor.update({
      email:body.email,
      password:hashedPassword,
      phone:body.phone,
      });
    return doctor;
    }catch (error) {
    throw new Error(error.message);
  }
};
const getVisualiseDoctorService = async (DoctorId) => {
  try {
    const doctor = await Models.Doctor.findOne({
      attributes: ["name", "lastName","email","password", "identityDoc","nroColegiatura","gender","phone"],
      where: {
        id: DoctorId,
      },
    });
    return doctor;
  } catch (e) {
    throw new Error(e.message);
  }
  };
module.exports = {
  getPastAppointmentsService,
  getFutureAppointmentsService,
  getAvailabilityService,
  getUpdateDoctorService,
  getVisualiseDoctorService,
  updateAvailabilityService,
};
