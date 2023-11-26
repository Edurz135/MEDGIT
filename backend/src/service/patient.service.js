const { Models } = require("../db.js");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

// Trae citas pasadas: fecha, tiempo, tipo, diagnostico y comentario
const getPastAppointmentsService = async (PatientId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ["id","startDate", "endDate","intervalDigit", "diagnostic"],
      where: {
        PatientId: PatientId,
        pending: false,
        state: 2,
      },
      include: [
        //Nombre doctor
        {
          model: Models.Doctor,
          attributes: ["name", "lastName"],
        },
      ],
    });
    return appointments;
  } catch (e) {
    throw new Error(e.message);
  }
};
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
        // Medico
        {
          model: Models.Doctor,
          attributes: ["name", "lastName"],
        },
      ],
    });

    return appointment;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getListDoctorsService = async () => {
  try {
    const result = await Models.Doctor.findAll({
      attributes: ["id", "name", "lastName"],
    });
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getListSpecialtiesService = async () => {
  try {
    const result = await Models.Specialty.findAll({
      attributes: ["id", "name"],
    });
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAvailabilityService = async (doctorId, specialtyId) => {
  // days -1 1234567
  try {
    // const temp = {
    //   1: "mondayDisponibility",
    //   2: "tuesdayDisponibility",
    //   3: "wednesdayDisponibility",
    //   4: "thursdayDisponibility",
    //   5: "fridayDisponibility",
    //   6: "saturdayDisponibility",
    //   7: "sundayDisponibility",
    // };

    // const days = "1234567";
    const conditionals = {};
    if (doctorId != "-1") conditionals.id = doctorId;
    if (specialtyId != "-1") conditionals.SpecialtyId = specialtyId;
    // const tempConditional = [];
    // {
    //   [Op.or]: [
    //     {
    //       mondayDisponibility: {
    //         [Op.like]: '%1%'
    //       }
    //     },
    //     {
    //       tuesdayDisponibility: {
    //         [Op.like]: '%1%'
    //       }
    //     }
    //   ]
    // }

    // if (days != "-1") {
    //   days.split("").map((digit) => {
    //     const param = {};
    //     const attrib = temp[parseInt(digit)];
    //     param[attrib] = {
    //       [Op.like]: "%1%",
    //     };
    //     tempConditional.push(param);
    //   });
    // }

    const currentDate = dayjs(); // Get the current date and time
    const result = await Models.Doctor.findAll({
      // attributes: ["date", "time", "type", "diagnostic"],
      where: conditionals,
      include: [
        {
          model: Models.Specialty,
          attributes: ["name"],
        },
        {
          model: Models.Appointment,
          where: {
            state: {
              [Op.ne]: 2,
            },
            startDate: {
              [Op.gte]: currentDate.toDate(), // Compare with the current date
            },
          },
        },
      ],
    });
    console.log(result);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

const bookAppointmentService = async (PatientId, AppointmentId) => {
  try {
    // console.log(PatientId, AppointmentId)
    const appointment = await Models.Appointment.findOne({
      where: {
        id: AppointmentId,
      },
    });

    await appointment.update({
      state: 2,
      PatientId: PatientId,
    });

    return appointment;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getFutureAppointmentsService = async (PatientId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ["id","startDate", "endDate","intervalDigit", "diagnostic"],
      where: {
        PatientId: PatientId,
        pending: true,
        state: 2,
      },
      include: [
        {
          model: Models.Doctor,
          attributes: ["name", "lastName"],
        },
      ],
    });

    return appointments;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getUpdatePacientService = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const patient = await Models.Patient.findOne({
      where: {
        id: PatientId,
      },
    });
    await patient.update({
      email: body.email,
      password: hashedPassword,
      phone: body.phone,
    });
    return patient;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getVisualisePacientService = async (PatientId) => {
  try {
    const patient = await Models.Patient.findOne({
      attributes: [
        "name",
        "lastName",
        "email",
        "password",
        "identityDoc",
        "gender",
        "phone",
      ],
      where: {
        id: PatientId,
      },
    });
    return patient;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getPatientsService = async (ids = []) => {
  try {
    const patient = await Models.Patient.findAll({
      where: { identityDoc: ids },
    });
    return patient;
  } catch (e) {
    throw Error("Error while finding a Patient");
  }
};

module.exports = {
  getPastAppointmentsService,
  getFutureAppointmentsService,
  getAppointmentDetailsService,
  getListDoctorsService,
  getAvailabilityService,
  getListSpecialtiesService,
  getUpdatePacientService,
  getVisualisePacientService,
  bookAppointmentService,
  getPatientsService,
};
